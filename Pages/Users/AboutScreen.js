import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View,Button,Image} from 'react-native'
import {unitWidth, width, height}from'../Adapt'
export class AboutScreen extends Component{
    static navigationOptions = {
        //   tabBarVisible: false, // 隐藏底部导航栏
           header:null,  //隐藏顶部导航栏
         };
    render(){
        return(
            <View style={style.about}>
                <Text style={{fontSize:30,marginBottom:10}}>关于我们</Text>
                <Text style={{fontSize:25}}>版本号：0.10</Text>
                <Text>此软件目前处于不断开发测试状态，目前支持用户自主选餐和查看</Text>
                <Text style={{marginBottom:5}}>下一个版本目标：用户登录功能，卡路里计算功能,修复已知bug</Text>
                <View style={style.border}></View>
                <View style={style.about}>
                    <Text  style={{fontSize:25,textAlign:'center'}}>支持我们：</Text>
                <Image style={{width:150,height:150}}source={require('D:/eatWhat/data/getmoney.jpg')}/>
                </View>
            </View>
        )
    }
}
const style=StyleSheet.create({
    about:{
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center',
        fontSize:20,
        marginBottom:5
    },
    border:{
        width:unitWidth*750,
        height:unitWidth*2,
        borderBottomWidth:1*unitWidth,
        borderBottomColor:'gray',
        marginBottom:2*unitWidth
    }
})