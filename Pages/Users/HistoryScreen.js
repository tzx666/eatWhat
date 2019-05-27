import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View,Button,ScrollView} from 'react-native'
import{userchoose}from '../HomeScreen'
import {ListItem, Icon,Overlay}from 'react-native-elements'
import {unitWidth, width, height}from'../Adapt'
console.log(userchoose)
export class HistoryScreen extends Component{
    render(){
        return(      
            <ScrollView>
                <View style={style.toptext}>
                <Text style={{fontSize:30}}>历史选餐</Text>
                </View>
                <Text>该用户共计选餐：{userchoose.length}份</Text>
                {userchoose.map((item,i)=>(
                    <ScrollView>
                    <Text>时间:{item.time}</Text>
                    <Text>消费：{item.total}</Text>
                    <ScrollView>
                    {
                        item.map((item1,i)=>(
                            <ListItem
                            bottomDivider true
                            title={item1.name}
                            />
                        ))
                    }
                    </ScrollView>
                    </ScrollView>
                ))}
            </ScrollView>
        )
    }
}
const style=StyleSheet.create({
    toptext:{
        width:unitWidth*750,
        height:unitWidth*375,
        textAlign:'center',
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: 'center',
    }
})