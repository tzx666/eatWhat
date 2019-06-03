import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View,Alert} from 'react-native'
import { Rating, AirbnbRating,Button } from 'react-native-elements';
import {storage}from'D:/eatWhat/data/storage'
import{userinfo}from'./UserScreen'
export class SettingScreen extends Component{
    static navigationOptions = {
        //   tabBarVisible: false, // 隐藏底部导航栏
           header:null,  //隐藏顶部导航栏
         };
    render(){
        return(
            <View style={{justifyContent:'flex-start',alignItems:'center',textAlign:'center'}}>
                <Text style={{fontSize:50}}>设置</Text>
                <Button title='退出登陆'onPress={()=>{
                   storage.save({
                    key: 'login',
                    data: {
                        name:'',
                        password:'',
                        permission:-1
                    },
                    //expires为有效时间
                    expires: 1000 * 3600
                })
                userinfo['name']=''
                userinfo['password']=''
                userinfo['permission']=-1
                Alert.alert("退出登陆成功")
                this.props.navigation.navigate('Home')
                }}/>
            </View>
        )
    }
}