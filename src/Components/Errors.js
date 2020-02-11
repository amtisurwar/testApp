import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, ActivityIndicator, StatusBar, AsyncStorage} from 'react-native';
import styles from '../assets/styles';

export default class Errors extends Component {
	constructor(props) {
	   super(props)
	}

  	render() {
    	return(
    		<View style={styles.errorContainer}>
    			<Text style={styles.errorMessage}>{this.props.error}</Text>
    		</View>
    	)
  	}
}

