import React from 'react'
import { Platform, AsyncStorage, FlatList, Modal, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Text, Avatar, Input, Button, Icon, Card, Badge } from 'react-native-elements';
import Common from '../Common';
import style from '../assets/styles';



export default class ShowAnswers extends React.PureComponent {
	constructor(props) {
        super(props);
        this.state = {
            parentId:'',
            answerText: '',
        }
        this.common = new Common()
    }

    showAnswerBox() {
        return(
            <View style={{marginVertical:15}}>
                <Input
                    placeholder="Post an answer"
                    multiline
                    value={this.state.answerText}
                    onChangeText={(text) => this.setState({answerText:text})}
                    inputStyle={{ fontSize: 14, margin: 0, }}
                    containerStyle={{ paddingLeft: 0, paddingRight: 0, }}
                    inputContainerStyle={{ margin: 0, padding: 0, borderBottomWidth: 1, borderColor: '#ccc' }}
                />
                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                        <Icon
                        name="save"
                        color="#3788DC"
                        type="font-awesome"
                        reverse
                        size={14}
                        onPress={() => this.props.saveAnswer(this.state.answerText, this.props.item, this.state.parentId)}
                        />
                        {this.state.parentId ? <Icon
                        name="times"
                        type="font-awesome"
                        color="#3788DC"
                        reverse
                        size={14}
                        onPress={() => this.setState({parentId:'',answerText:''})}
                        /> : null}
                </View>
            </View>
        )
    }

    

    showComments = (item) => {
        const rows = this.props.comments.filter( comment => {
            return comment.parentId == item.id
        })
        if(rows) {
            return (
                <View style={{ marginLeft:20}}>
                    <FlatList
                    data={rows}
                    keyExtractor={(item, index) => item.id}
                    renderItem={this.renderItem}
                    />
                </View>
            )   
        }
    } 
    
    renderItem = ({item, index}) => {
        if(item.questionId === this.props.item.id) {
            if(item.createdOn instanceof Date) {
                var date = item.createdOn;
            }
            else {
                var date = item.createdOn.toDate();
            }
            
            return(
                <View>
                <View style={{flexDirection:'row', marginBottom:10}}>
                    <View style={{width:50,alignItems:'center'}}>
                        <Avatar rounded title='M' size="small" />
                        <Text numberOfLines={2} style={{fontSize:10, textAlign:'center'}}> {this.common.getDateFormat(date)}</Text>
                    </View>
                        <View style={{flex:1}}>
                        {this.props.showReply ? <TouchableOpacity onPress={() => this.setState({parentId:item.id, answerText:''})}>
                            <Text style={{minHeight:40}}>{item.answer}</Text>
                        </TouchableOpacity> : <Text style={{minHeight:40}}>{item.answer}</Text>}
                        </View>
                </View>
                {this.state.parentId === item.id && this.showAnswerBox()}
                {this.showComments(item)}
                </View>
            )
        }
    }

    ItemSeparatorComponent = ({leadingItem}) => {
        return leadingItem.questionId === this.props.item.id && <View style={style.itemSeperator}></View>
        
    }

	render() {
		return(
            <SafeAreaView>
                <FlatList
                    data={this.props.answers}
                    keyExtractor={(item, index) => item.id}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={this.ItemSeparatorComponent}
                />
                {!this.state.parentId && this.props.showReply && this.showAnswerBox()}
            </SafeAreaView>
        )
	}
}