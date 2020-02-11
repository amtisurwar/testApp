import React, {Component} from 'react';
import {Platform, StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, AsyncStorage} from 'react-native';


import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Splash from './src/Containers/Splash';
import LoginStack from './src/Routes/LoginStack';
import DoctorStack from './src/Routes/DoctorStack';
import PatientStack from './src/Routes/PatientStack';
import Selection from './src/Containers/Selection';

export default createAppContainer(
  createSwitchNavigator(
    {
      Splash: Splash,
      Selection: Selection,
      Doctor: DoctorStack,
      Patient: PatientStack,
      Login: LoginStack,
    },
    {
      initialRouteName: 'Splash',
    }
  )
);
console.disableYellowBox = true;