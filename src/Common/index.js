import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Image, AsyncStorage} from 'react-native';
import Toast from 'react-native-simple-toast'
import firebase from 'react-native-firebase';



export default class Common {
	
	constructor() {
	}
	

	validateEmail(email) {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
		{
			return true;
		}
		return false;
	}

	validatePhone(phone)
	{
		var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
		return phone.match(phoneno) ? true : false;
	}

	validateZipCode(zipcode){
		var zipCodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
		return zipCodePattern.test(zipcode);
	}

	getIcon() {
		return <Icon name='times-circle-o' color='red' type='font-awesome' />
	}

	getTwentyFourHourTime(amPmString) { 
        var d = new Date("1/1/2013 " + amPmString); 
        return (d.getHours()<10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes()<10 ? '0' : '') + d.getMinutes();
	}
	
	getDateFormat2(date) {
		var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0');
		var yyyy = date.getFullYear();
		
        var time = (date.getHours()<10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes()<10 ? '0' : '') + date.getMinutes();
        return mm + '/' + dd + '/' + yyyy + " " + time;
	}

	getDateFormat(date) {
		// var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
				var diff = (((new Date()).getTime() - date.getTime()) / 1000),
				day_diff = Math.floor(diff / 86400);
			
			if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
				return;
			
			return day_diff == 0 && (
					diff < 60 && "just now" ||
					diff < 120 && "1 min ago" ||
					diff < 3600 && Math.floor( diff / 60 ) + " mins ago" ||
					diff < 7200 && "1 hour ago" ||
					diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
				day_diff == 1 && "Yesterday" ||
				day_diff < 7 && day_diff + " days ago" ||
				day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
	}

	parseAddress = (details) => {
		const stateFinder = "administrative_area_level_1";
        const zipFinder = "postal_code";
        const cityFinder = "administrative_area_level_2";
    
		const { address_components } = details;
		var row = {zipcode:'',state:'',city:''}
        address_components.map( (item) => {
            item.types.map( (type) => {
                if(type == zipFinder) {
					row.zipcode = item.long_name
                }
                if(type == stateFinder) {
                    row.state = item.long_name
                }
                if(type == cityFinder) {
                    row.city = item.long_name
                }
            })
		})
		return row;
	}

	showToast(msg) {
		return (
			Toast.show(msg)
		)
	}

	formatPhoneNumber(phoneNumberString) {
		var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
		var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
		if (match) {
		  return match[1] + '-' + match[2] + '-' + match[3]
		}
		return phoneNumberString
	}
	
	getUserId() {
		return firebase.auth().currentUser.uid;
	}

	getUser() {
		return firebase.auth().currentUser;
	}

	getUserProfile(uid = null) {
		if(!uid) {
			uid = this.getUserId()
		}
		return firebase.firestore().collection('users').where('user_id','==',uid).get().then( message => {
           return message.docs.pop().data()			
		})
		

		
		
    }

	
}