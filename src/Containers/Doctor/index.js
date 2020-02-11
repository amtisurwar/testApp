import React, { Component } from 'react';
import { Platform, View, AsyncStorage } from 'react-native';
import { Text, Input, Button, Icon } from 'react-native-elements';
import style from '../../assets/styles';
import firebase from 'react-native-firebase';
import Common from '../../Common';


export default class Doctor extends Component {
	constructor(props) {
		super(props);
		this.common = new Common();
	}

	signOut = () => {
		firebase.auth().signOut().done(() => {
			this.props.navigation.navigate('Login')
		});
	}

	render() {
		return (
			<View style={style.container}>
				<View style={style.flexContainer}>
					<Text>Doctor HomePage</Text>
				</View>
				<View style={{alignItems:'flex-end'}}>
				<Icon
					reverse
					name='plus'
					type='font-awesome'
					color='#517fa4'
					onPress={() => this.props.navigation.navigate('CreateArticle')} 
				/>
				<Icon
					reverse
					name='sign-out'
					type='font-awesome'
					color='#517fa4'
					onPress={() => this.signOut()}
				/>
				</View>
				<View>
				
				</View>
			</View>
		)
	}
}

