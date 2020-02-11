import React, { Component } from 'react';
import {
  createStackNavigator,
} from 'react-navigation-stack';

import PatientDashboard from '../Containers/Patient'
import Chat from '../Containers/Patient/Chat'
import Search from '../Containers/Patient/Search'
import DoctorDetail from '../Containers/Patient/DoctorDetail'

const PatientStack = createStackNavigator({
  Dashboard: {
    screen: PatientDashboard,
    navigationOptions: ({ navigation }) => ({
      
    })
  },
  Chat: {
    screen: Chat,
    navigationOptions: ({ navigation }) => ({
        
    })
  },
  Search:Search,
  DoctorDetail:{
    screen: DoctorDetail,
    navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.getParam('item') ? navigation.getParam('item').firstname + " " + navigation.getParam('item').lastname : 'Doctor Profile'
    })
  },
  
  
},
{headerLayoutPreset: 'center'},
{
    initialRouteName: 'Dashboard'
});

module.exports = PatientStack;