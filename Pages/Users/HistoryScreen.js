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
                <Text style={{fontSize:20}}>历史选餐</Text>
                <Text style={{fontSize:15}}>该用户共计选餐：{userchoose.length}份</Text>
                </View>
                
                {userchoose.map((item,i)=>(
                    <ScrollView>
                    <Text style={{fontSize:18,marginBottom:2*unitWidth}}>时间:{item.time}</Text>
                    <Text style={{fontSize:15,marginBottom:2*unitWidth}}>消费：{item.total}元</Text>
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
        height:unitWidth*100,
        textAlign:'center',
        backgroundColor:'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth:1*unitWidth,
        marginBottom:2*unitWidth,
        borderBottomColor:'gray',
    }
})