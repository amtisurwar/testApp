import React, { Component, useState } from 'react';
import { Platform, View, AsyncStorage, FlatList, Modal, SafeAreaView, TouchableOpacity } from 'react-native';
import { Text, Input, Button, Icon, Card, Badge, Avatar } from 'react-native-elements';
import style from '../../assets/styles';
import firebase from 'react-native-firebase';
import Common from '../../Common';
import AnswerModal from '../../Components/AnswerModal';
import ShowAnswers from '../../Components/ShowAnswers';
import { ScrollView } from 'react-native-gesture-handler';


const AnswerRef = firebase.firestore().collection('answer');

export default class Doctor extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			questions: [],
			answers: [],
			comments: [],
			modalVisible: false,
			currentItem:[],
			refreshing: false,
		}
		this.common = new Common()
		
	}

	componentDidMount() {
		this.getData()
	}

	closeModal = () => {
		this.setState({modalVisible:false})
	}

	openModal = (item, questionId) => {
		this.setState({
			currentItem: item,
			modalVisible: true,
		})
	}

	saveAnswer = async (answer, item, parentId = '') => {
		
		var request = {
			answer: answer,
			userId: this.common.getUserId(),
			questionId: item.id,
			parentId: parentId ? parentId : '',
			createdOn: new Date(),
			modifiedOn: new Date(),
		}
		AnswerRef.add(request)
		.catch( error => {
			this.common.showToast('Something went wrong, please try again later')
		})
		.done( success => {
			
			this.common.showToast('Answer Save Successfully.')
			this.setState({
				modalVisible: false,
			})
			
			this.restructure(success, request)
			// this.getData()
		});
	}

	restructure(success, request) {
		if(!request.parentId) {
			const state = [...this.state.answers];
			request['id'] = success.id,
			state.push(request);
			this.setState({answers:state});
		}
		else {
			const state = [...this.state.comments];
			request['id'] = success.id,
			state.push(request);
			this.setState({comments:state});
		}
	}
	

	getData = async () => {
		var questions = [];
		var answers = [];
		var comments = [];
		var users = firebase.auth();
		
		var snapshot = await firebase.firestore().collection('question').get();
		
		snapshot.docs.map(item => {
			const question = item.data();
			question['id'] = item.id;
			questions.push(item.data())
		})
		await AnswerRef.orderBy('createdOn','DESC').get().then( ans => {
			ans.docs.forEach(item => {
				const answ = item.data();
				answ['id'] = item.id;
				if(answ.parentId == '') {
					answers.push(answ)
				}
				else {
					comments.push(answ)
				}
			})	
		})
		
		
		this.setState({
			questions: questions,
			answers: answers,
			comments: comments,
		})
		
	}

	signOut = () => {
		firebase.auth().signOut().done(() => {
			this.props.navigation.navigate('Login')
		})
		
	}

	
	getCommentRow = (item) => {
		const count = this.state.answers.filter( row => {
			return row.questionId === item.id
		})
		return (
			<TouchableOpacity onPress={() => this.openModal(item)}>
				<View style={style.postIcons} >
				<Icon
					name="comment-o"
					type="font-awesome"
					reverse
					color="#3788DC"
					size={14}
				/>
				<Text>Answers </Text>
				<Badge status="primary" value={count.length}  />
				</View>
			</TouchableOpacity>
		)
	}

	cardHeader = (item) => {
		return(
			<View style={{padding:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
				<View style={{flexDirection:'row',  alignItems:'center',}}>
					<Avatar rounded title="MD" />
					<Text> Mohd Kausar</Text>
				</View>
				<View>
				<Text style={{textAlign:'right'}}> {this.common.getDateFormat(item.createdOn.toDate())}</Text>
				</View>
			</View>
		)
	}

	renderItem = ({item}) => {
		return(
			<Card
				title={this.cardHeader(item)}
				image={item.image ? {uri: item.image} : null}>
				
				<Text style={{marginBottom: 10, fontWeight:'bold'}}>{item.question}</Text>
				{this.getCommentRow(item)}
				<ScrollView style={{maxHeight:300}}>
					<ShowAnswers comments={this.state.comments} item={item} answers={this.state.answers} />
				</ScrollView>
			</Card>
		)
	}

	render() {
		return (
			<SafeAreaView style={{flex:1}}>
				<FlatList
					data={this.state.questions}
					renderItem={this.renderItem}
					keyExtractor={(item, index) => item.id}
					refreshing={this.state.refreshing}
					onRefresh={this.getData}
					
				/>
				<AnswerModal comments={this.state.comments} answers={this.state.answers} saveAnswer={this.saveAnswer} closeModal={this.closeModal} item={this.state.currentItem} modalVisible={this.state.modalVisible} />
				<Icon
					reverse
					name='sign-out'
					type='font-awesome'
					color='#517fa4'
					containerStyle={{position:'absolute', bottom:15, right: 15}}
					onPress={() => this.signOut()}
				/>
				<Icon
					reverse
					name='search'
					type='font-awesome'
					color='#517fa4'
					containerStyle={{position:'absolute', bottom:80, right: 15}}
					onPress={() => this.props.navigation.navigate('Search')}
				/>
			</SafeAreaView>
		)
	}
}
