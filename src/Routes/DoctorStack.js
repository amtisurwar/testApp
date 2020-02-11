import React, { Component } from 'react';
import {
  createStackNavigator,
} from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import DoctorDashboard from '../Containers/Doctor'
import CreateArticle from '../Containers/Doctor/CreateArticle'
import Chat from '../Containers/Patient/Chat'
import RecentMessages from '../Containers/Common/RecentMessages'
import { Icon } from 'react-native-elements';

const DoctorStack = createStackNavigator({
  Dashboard: {
    screen: DoctorDashboard,
    navigationOptions: ({ navigation }) => ({
        headerRight:  <Icon
        type="font-awesome"
        name="location-arrow"
        reverse
        size={14}
        color="#3788DC"
        onPress={() => navigation.navigate('RecentMessages')}
      />
    })
  },
  
  CreateArticle: {
    screen: CreateArticle,
    navigationOptions: ({ navigation }) => ({
        headerTitle: 'Create Question'
    })
  },
  Chat:{
    screen: Chat,
    navigationOptions: ({ navigation }) => ({
        headerTitle: 'Chat'
    })
  },
  RecentMessages:{
    screen: RecentMessages,
    navigationOptions: ({ navigation }) => ({
        headerTitle: 'Messages'
    })
  },
},
{headerLayoutPreset: 'center'},
{
    initialRouteName: 'Dashboard'
});

module.exports = createAppContainer(DoctorStack);