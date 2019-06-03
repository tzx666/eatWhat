import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableHighlight,ScrollView } from "react-native";
import {ListItem, Icon,Overlay}from 'react-native-elements'
import {unitWidth, width, height, unitHeight}from'../Pages/Adapt'
export class Overlayforcount extends Component{
render(){
    return( <Overlay isVisible={this.props.isVisible}>
        <View style={style.menu}>
<Text style={{fontSize:30,marginBottom:20*unitWidth,borderBottomWidth:1*unitWidth}}>选择清单</Text>
<ScrollView style={{width:260,height:300,borderWidth:1*unitWidth,borderRadius:15}}>
{
  this.props.choose.map((item,id)=>(
      <View style={style.text3}>
      <Text style={{height:30}}>{item.name}</Text>
      <Text style={{height:30}}>{"价格:"+item.price+"元"}</Text>
      </View>
  ))
}
</ScrollView>
<Text style={style.text2}>总计 {this.props.total+"元"}</Text>
<View style={{flexDirection:'row',width:260,height:60}}>
<TouchableHighlight style={{width:100,height:40,marginRight:20,marginLeft:20,borderWidth:1*unitWidth}}onPress={this.props.add}>
<View style={style.textinbutton}><Text style={style.text1}>确定</Text></View> 
</TouchableHighlight>
<TouchableHighlight style={{width:100,height:40,marginRight:20,marginLeft:20,borderWidth:1*unitWidth}}onPress={this.props.remove}>
<View style={style.textinbutton}><Text style={style.text1}>back</Text></View>
</TouchableHighlight>
</View>
</View>
</Overlay>)
}
}
const style=StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    toptext:{
        width:unitWidth*750,
        height:unitWidth*375,
        textAlign:'center',
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: 'center',
    } ,bottomborder:{
        width:unitWidth*750,
        height:unitWidth*2,
        borderBottomWidth:1*unitWidth,
        borderBottomColor:'gray',
        marginBottom:2*unitWidth
     },
     circle:{
    alignItems:'center',
    justifyContent:'center',
    width: 40,
    height:40,
    borderWidth:1,
    borderColor:'black',
    borderStyle:'solid',
    borderRadius:90,
    paddingBottom:2    
    },
    button1:{
        color:'white',
        borderColor:'black',
        borderStyle:'solid',
        borderWidth:1*unitWidth,
        borderRadius:15,
        width:50*unitWidth,
        height:50*unitWidth,
        marginBottom:5*unitWidth,
        textAlign:'center',
        fontSize:20, alignItems:'center',
        justifyContent:'center',marginRight:10*unitWidth,marginLeft:10*unitWidth,
    },
    menu:{
        justifyContent:'flex-start',
        alignItems:'center',
        fontSize:30,
        textAlign:'center',
        width:260,
        height:460,
    },
    button3:{
        width:100,height:40,marginRight:20,marginLeft:20,borderWidth:1*unitWidth,borderRadius:15
    },
    textinbutton:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        fontSize:20
    },
    text1:{
        textAlign:'center',
        fontSize:20
    },text2:{
        textAlign:'center',
        fontSize:20,
        paddingBottom:10
    },text3:{
        textAlign:'center',
        fontSize:20,
        borderBottomWidth:1*unitWidth,
        marginBottom:5
    }
});