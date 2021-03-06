import React, {Component} from 'react'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation"
import {Button,View}from 'react-native'
import { HomeScreen} from './Pages/HomeScreen'
import {UserScreen} from './Pages/Users/UserScreen'
import{HistoryScreen}from'./Pages/Users/HistoryScreen'
import {MyInformationScreen}from './Pages/Users/Information/MyInformationScreen'
import {requestpreScreen}from './Pages/Users/Information/requestpreScreen'
import {scoreformealScreen}from './Pages/Users/Information/scoreformealScreen'
import {changemealsScreen}from './Pages/Users/Information/changemealsScreen'
import{SettingScreen}from'./Pages/Users/SettingScreen'
import{AboutScreen}from './Pages/Users/AboutScreen'
import{changeScreen}from'./Pages/Users/Information/changeScreen'
import{dealScreen}from'./Pages/Users/Information/dealScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
const Users=createStackNavigator({
    Home:UserScreen,
    History:HistoryScreen,
    MyInformation:MyInformationScreen,
    Setting:SettingScreen,
    About:AboutScreen,
    requestpre:requestpreScreen,
    scoreformeal:scoreformealScreen,
    changemeals:changemealsScreen,
    deal1:changeScreen,
    deal2:dealScreen,
},{
  initialRouteName: "Home"
});
const AppNavigator = createBottomTabNavigator(
  {
    Home1: HomeScreen,
    Users:Users,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home1') {
          iconName = `ios-home`;
          // Sometimes we want to add badges to some icons. 
          // You can check the implementation below.
        } else if (routeName === 'Details') {
          iconName = `ios-speedometer`;
        }else if(routeName === 'Users'){
          iconName=`ios-person`
        }
         

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      showIcon:true,
    },
  }
);
export default createAppContainer(AppNavigator);
