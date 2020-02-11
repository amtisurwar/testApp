import React, { Component, useState } from 'react';
import { Platform, View, AsyncStorage, FlatList, Modal, SafeAreaView, TouchableOpacity } from 'react-native';
import { Text, Input, Button, Icon, Card, Badge, Avatar, SearchBar, ListItem } from 'react-native-elements';
import style from '../../assets/styles';
import firebase from 'react-native-firebase';
import Common from '../../Common';
import { ScrollView } from 'react-native-gesture-handler';
import UserAvatar from '../../Components/UserAvatar';

const ChatMessages = firebase.firestore().collection('Chat');
const Users = firebase.firestore().collection('users');

export default class RecentMessages extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
            search: '',
            data: [],
            typing: false,
            typingTimeout: 0,
            refreshing: false,
            users: []
		}
		this.common = new Common()
        this.id = this.common.getUserId()
	}

	componentDidMount() {
        this.getUsers()
		
    }

    getUsers = () => {
        var users = [];
        Users.onSnapshot( snap => {
            snap.docChanges.forEach(user => {
                users[user.doc.id] = user.doc.data()
			})
            this.setState({users: users}, () => {
                this.getData()
            })
        })
    }

    
    async getData() {
		var messages = [];
        var ids = [];
        var users = this.state.users;
        var userkeys = Object.keys(users)
        ChatMessages.where('to','==',this.id).onSnapshot( snap => {
            snap.docChanges.forEach(message => {
				if(ids.indexOf(message.id) === -1) {
                    if(userkeys.indexOf(message.doc.data().from) >= 0) {
                        var message = message.doc.data();
                        message['user'] = users[message.from];
                        messages.push(message)
                    }
				}
				ids.push(message.id)
            })
            this.setState({data: messages})
        })
		
    
    }
    
    updateSearch = search => {
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }
         this.setState({
            search: search,
            typing: false,
            page:1,
            typingTimeout: setTimeout(() => {
               this.getData()
            }, 3000)
         });
    };

    
	renderItem = ({item, index}) => {
        return <ListItem
                    title={item.user.first_name + " " + item.user.last_name}
                    bottomDivider
                    leftIcon={<UserAvatar user={item.user} />}
                    chevron
                    onPress={() => this.props.navigation.navigate('Chat',{profile:item.user})}
                />
    }

    refresh = () => {
        this.setState({search:'', data:[]})
    }

    header = () => {
        return <SearchBar
            placeholder="Search..."
            onChangeText={this.updateSearch}
            value={this.state.search}
            round
            lightTheme={true}
            onClear={this.refresh}
        />
    }

	render() {
		return (
			<SafeAreaView>
				 <FlatList
                    data={this.state.data}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderItem}
                    ListHeaderComponent={this.header}
                    refreshing={this.state.refreshing}
                    onRefresh={this.refresh}
                />
               
                
                
			</SafeAreaView>
		)
	}
}
