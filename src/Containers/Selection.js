import React, {Component} from 'react';
import {Platform, View, AsyncStorage} from 'react-native';
import style from '../assets/styles';
import {Text, Input, Button} from 'react-native-elements';
import firebase from 'react-native-firebase';


export default class Splash extends Component {
	constructor(props) {
	   super(props);
	}

	setRole(role) {
		var user = firebase.auth().currentUser;
		const navigation = this.props.navigation;
		if(user) {
			user.updateProfile({
				displayName: role,
			}).then(function() {
				navigation.navigate(role)
			}, function(error) {
				console.log("update error", error)
			});
		}
	}
	
  	render() {
    	return(
    		<View style={style.container}>
				<Button title="Doctor" onPress={() => this.setRole('Doctor')} />
				<Button containerStyle={style.mtop15} title="Patient" onPress={() => this.setRole('Patient')} />
    		</View>
    	)
  	}
}

