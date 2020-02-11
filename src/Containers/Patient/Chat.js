import React, { Component, useState } from 'react';
import { Platform, View, AsyncStorage, FlatList, Modal, ScrollView, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Text, Input, Button, Icon, Card, Badge, Avatar, ListItem } from 'react-native-elements';
import style from '../../assets/styles';
import firebase from 'react-native-firebase';
import Common from '../../Common';
import UserAvatar from '../../Components/UserAvatar';


const Chat = firebase.firestore().collection('Chat');
const Users = firebase.firestore().collection('users');

export default class Doctor extends React.PureComponent {
    // static navigationOptions = ({navigation}) => {
    //     return {
    //         headerTitle: navigation.getParam('profile') ? "Chat with " + navigation.getParam('profile').firstname + " " + navigation.getParam('profile').lastname : 'Chat'
    //     }
    // }
	constructor(props) {
		super(props);
		this.state = {
            refreshing: false,
            fromStack: [],
            toStack: [],
            messageStack: [],
            fromProfile: [],
            toProfile: [],
            loading: true,
		}
        this.common = new Common()
        
    }
    
    componentDidMount() {
        this.setUser()
        
    }

    setUser = async () => {
        var profile = this.props.navigation.getParam('profile');
        var fromProfile = await this.common.getUserProfile();
        var toProfile = await this.common.getUserProfile(profile.user_id);
        this.setState({
            fromProfile,
            toProfile
        }, () => {
            this.getData()
        })
    }
    

	componentWillMount() {
		// this.getData()
    }
    
    getData = async () => {
        var from = this.state.fromStack
        var to = this.state.toStack
        
        await Chat.where('to','==',this.state.toProfile.user_id).onSnapshot( snap => {
            snap.docChanges.forEach(message => {
                to.push(message.doc.data())
                
            })
            this.setState({toStack: to}, () => {
                this.mergeChat()
            })
        })
        await Chat.where('from','==',this.state.toProfile.user_id).onSnapshot( snap => {
            snap.docChanges.forEach(message => {
                from.push(message.doc.data())
                
            })
            this.setState({fromStack: from, loading: false}, () => {
                this.mergeChat()
            })
        })
    }


    mergeChat = () => {
        var from = this.state.fromStack;
        var to = this.state.toStack;
        var chats = from.concat(to)
        var sortChat = chats.sort(function(a, b){
            return a.createdOn.seconds - b.createdOn.seconds
        })
        this.setState({messageStack: sortChat}, () => {
        
            // this.ref.scrollToOffset({offset:1})
        })
    }

    sendMessage = () => {
        var msg = this.state.value;
        if(!msg) return;
        this.setState({value:''})
        var request = {
            message: msg,
            from: this.state.fromProfile.user_id,
            to: this.state.toProfile.user_id,
            createdOn: new Date(),
        }
        Chat.add(request).done(() => {
            
        });
        
    }

    toRow = (item) => {
        return (
            <ListItem
                rightAvatar={<UserAvatar user={this.state.toProfile} size="small" />}
                rightTitle={item.message}
                rightSubtitle={this.common.getDateFormat(item.createdOn.toDate())}
                containerStyle={{backgroundColor:'transparent'}}
                rightContentContainerStyle={{padding:5,borderColor:'blue',flex:1, borderWidth:.5, borderRadius:10, marginLeft:0}}
                
                rightTitleStyle={{fontSize:12}}
                rightSubtitleStyle={{fontSize:10}}
            />
        )
    }

    fromRow = (item) => {
        return(
            <ListItem
            leftAvatar={<UserAvatar user={this.state.fromProfile} size="small" />}
            title={item.message}
            subtitle={this.common.getDateFormat(item.createdOn.toDate())}
            containerStyle={{backgroundColor:'transparent'}}
            contentContainerStyle={{padding:5,borderColor:'#E82368', borderWidth:.5, borderRadius:10, marginLeft:0}}
            titleStyle={{fontSize:12}}
            subtitleStyle={{fontSize:10}}
            />
        )
    }

    renderItem = ({item, index}) => {
        return item.to == this.state.fromProfile.user_id ? this.fromRow(item) : this.toRow(item)
    }


	render() {
		return (    
			<View style={[{flex:1}]}>
                <View style={[style.secondaryBackground, {flex:1, paddingVertical:5}]}>
                    <FlatList
                        data={this.state.messageStack}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={this.renderItem}
                        refreshing={this.state.refreshing}
                        onRefresh={this.getData}
                        inverted={false}
                        ref={(ref) => this.flatList = ref}
                        onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
                        
                    />
                </View>
                <View style={{height:50,marginBottom:6}}>
                    <Input
                        value={this.state.value}
                        onChangeText={(text) => this.setState({value: text})}
                        placeholder="Enter Message"
                        multiline
                        inputStyle={{fontSize:14}}
                        rightIcon={
                            <Icon
                                type="font-awesome"
                                name="location-arrow"
                                reverse
                                size={14}
                                color="#3788DC"
                                iconStyle={{transform: [{ rotate: '45deg'}],}}
                                onPress={() => this.sendMessage()}
                            />
                        }
                    />
                </View>
            </View>
		)
	}
}
