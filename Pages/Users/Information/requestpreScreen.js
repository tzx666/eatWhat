import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View,Button} from 'react-native'
export class requestpreScreen extends Component{
    static navigationOptions = {
      //  tabBarVisible: false, // 隐藏底部导航栏
        header:null,  //隐藏顶部导航栏
      };
    render(){
        return(
            <View>
                <Text>qingqiuguanli</Text>
            </View>
        )
    }
}