import React, { Component, useState } from 'react';
import { Platform, View, AsyncStorage, FlatList, Modal, SafeAreaView, TouchableOpacity } from 'react-native';
import { Text, Input, Button, Icon, Card, Badge, Avatar, SearchBar, ListItem } from 'react-native-elements';
import style from '../../assets/styles';
import firebase from 'react-native-firebase';
import Common from '../../Common';
import { ScrollView } from 'react-native-gesture-handler';


const DoctorRef = firebase.firestore().collection('doctors');

export default class Symptoms extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
            search: '',
            data: [],
            typing: false,
            typingTimeout: 0,
            refreshing: false,
		}
        this.common = new Common()
        console.log(this.common.getUserId())
		
	}

	componentDidMount() {
		// this.getData()
    }
    
    getData() {
        if(!this.state.search) return null
        var data = [];
        DoctorRef.where('specialities', 'array-contains',(this.state.search).toLowerCase()).get().then(result => {
            result.docs.forEach(res => {
                data.push(res.data())
            })
            this.setState({data:data})
            
        });
        
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

    addDoctor() {
        DoctorRef.add({
            city: 'Noida',
            clinic_name: 'Clinic Noida',
            contact: '3245781240',
            country: 'India',
            description: 'This is a test doctor',
            id:'YJAZhhaihrPV3Q25YhLyqUwxVEx1',
            firstname: 'Mohd',
            lastname: 'Kausar',
            location:['12.445','3.457'],
            specialities: ['fever','heart','dentist'],
            type: 'clinic'
        }).done(res => {
            console.log(res)
        })
    }

    renderItem = ({item, index}) => {
        return <ListItem
                    title={item.firstname + " " + item.lastname}
                    bottomDivider
                    subtitle={item.specialities.join(", ")}
                    leftIcon={<Avatar rounded title={item.firstname.charAt(0)+item.lastname.charAt(0) } />}
                    chevron
                    onPress={() => this.props.navigation.navigate('DoctorDetail',{item:item})}
                
                />
    }

    refresh = () => {
        this.setState({search:'', data:[]})
    }

    header = () => {
        return <SearchBar
            placeholder="Search Symptoms..."
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
                    keyExtractor={(item, index) => item.id}
                    renderItem={this.renderItem}
                    ListHeaderComponent={this.header}
                    refreshing={this.state.refreshing}
                    onRefresh={this.refresh}
                />
                {/* <Button title="add" onPress={() => this.addDoctor()} /> */}
                
                
			</SafeAreaView>
		)
	}
}
