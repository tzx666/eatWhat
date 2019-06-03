import{Aboutus}from'D:/eatWhat/components/about'
import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View,Button,Image} from 'react-native'
import {unitWidth, width, height}from'D:/eatWhat/Pages/Adapt.js'
export class AboutScreen extends Component{
    static navigationOptions = {
           header:null,
         };
    render(){
        return(<Aboutus/>) 
    }
}