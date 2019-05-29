import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View,Button} from 'react-native'
export class MyInformationScreen extends Component{
    render(){
        return(
            <View>
                <Button title='申请管理员' onPress={()=>this.props.navigation.navigate('requestpre')}/>
                <Button title='为菜品打分' onPress={()=>this.props.navigation.navigate('scoreformeal')}/>
                <Button title='修改菜品' onPress={()=>this.props.navigation.navigate('changemeals')}/>
            </View>
        )
    }
}