import React, { Component } from 'react';
import {
  createStackNavigator,
} from 'react-navigation-stack';

import Login from '../Containers/Login';
import SignUp from '../Containers/SignUp';

const LoginStack = createStackNavigator({
  SignIn: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Sign In',
      headerTitleAlign:'center',
    })
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Sign Up',
      headerTitleAlign:'center',
    })
  },
},{
    initialRouteName: 'SignIn'
});

module.exports = LoginStack;