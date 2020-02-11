import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Image, AsyncStorage} from 'react-native';
import { Input, Button, Icon, Card, Badge, Avatar, SearchBar, ListItem } from 'react-native-elements';
import style from '../assets/styles';

UserAvatar = (props) => {
    var pic;
    if(props.user && props.user.profile_picture) {
        pic = <Avatar
            rounded
            titleStyle={{color:'#FFF'}} overlayContainerStyle={{backgroundColor:'#E82368'}}
            size={props.size ? props.size : 'medium'}
            source={{
                uri: props.user.profile_picture,
            }}
        />
    }
    else if(props.user && props.user.first_name && props.user.last_name) {
        pic = <Avatar
            rounded
            titleStyle={{color:'#FFF'}} overlayContainerStyle={{backgroundColor:'#E82368'}}
            size={props.size ? props.size : 'medium'}
            title={props.user.first_name.charAt(0)+props.user.last_name.charAt(0) }
            
        />
        
    }
    else if(props.user && props.user.first_name) {
        pic = <Avatar
            rounded
            titleStyle={{color:'#FFF'}} overlayContainerStyle={{backgroundColor:'#E82368'}}
            size={props.size ? props.size : 'medium'}
            title={props.user.first_name.charAt(0)}
        />
    }
    else {
        pic = <Avatar
            rounded
            titleStyle={{color:'#FFF'}} overlayContainerStyle={{backgroundColor:'#E82368'}}
            size={props.size ? props.size : 'medium'}
            icon={{ name: 'user', type: 'font-awesome' }}
        />
    }
    return pic
   
}
export default UserAvatar;