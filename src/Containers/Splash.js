import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, ActivityIndicator, StatusBar, AsyncStorage} from 'react-native';
import style from '../assets/styles';
import Notification from '../Components/Notification';

export default class Splash extends Component {
	constructor(props) {
	   super(props);
	}
	componentDidMount() {
	   setTimeout(() => {
			this._bootstrapAsync();
	   },3000)
	}

	_bootstrapAsync = async () => {
		const roleId = await AsyncStorage.getItem('roleId');
		if(roleId == 1) {
			this.props.navigation.navigate('Doctor');
		}
		else if(roleId == 1) {
			this.props.navigation.navigate('Patient');
		}
		else {
			this.props.navigation.navigate('Login');
		}
	   	
	};

  	render() {
    	return(
    		<View style={style.flexContainer}>
				<Notification />
          		<Text>Welcome to App</Text>
    		</View>
    	)
  	}
}

