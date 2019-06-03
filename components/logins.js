import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableHighlight,ScrollView } from "react-native";
import {ListItem, Icon,Overlay,CheckBox,Button}from 'react-native-elements'
import {unitWidth, width, height, unitHeight}from'../Pages/Adapt'
export class Loginfirst extends Component{
    render(){
return(<View style={style.avatar}><TouchableHighlight onPress={this.props.loginfirst}>
 <Text style={{fontSize:70*unitWidth,marginLeft:5}}>请先登陆/注册</Text>
</TouchableHighlight></View>)
    }
}
export class Users extends Component{
    render(){
        return(<View style={style.avatar}><TouchableHighlight onPress={this.props.loginusers}>
{this.props.permission==1?<Text style={{fontSize:70*unitWidth,marginLeft:5}}>普通用户：{this.props.name}</Text>:
  <Text style={{fontSize:70*unitWidth,marginLeft:5}}>管理员：{this.props.name}</Text>}</TouchableHighlight></View>)
    }
}
export class Regisit extends Component{
    render(){
        return(<ScrollView>
            <View style={style.inputs}>
            <Text style={{marginRight:10,width:20,marginLeft:10,}}>用户名:</Text>
         <TextInput autoFocus='true'style={{height: 40,  borderWidth: 1,borderRadius:15,borderColor:'black',width:280}}
            placeholder='input username'
            onChangeText={this.props.Rname}//oname
            value={this.props.name}/></View>
             <View style={style.inputs}>
             <Text style={{marginRight:10,width:20,marginLeft:10,}}>密码:</Text>
        <TextInput autoFocus='true' style={{height: 40,  borderWidth: 1,borderRadius:15,borderColor:'black',width:280}}
            placeholder='input password'
            onChangeText={this.props.Rpassword}//onpassword
            value={this.props.password}/></View>
            <View style={style.inputs}>
            <Text style={{marginRight:10,width:20,marginLeft:10,}}>邮箱:</Text>
        <TextInput autoFocus='true' style={{height: 40,  borderWidth: 1,borderRadius:15,borderColor:'black',width:280}}
            placeholder='input email'
            onChangeText={this.props.Remail}//onmail
            value={this.props.email}/></View>
    <View style={style.buttons}>
        <Button buttonStyle={{width:100,height:50}}title='注册'type='outline' onPress={this.props.Rset}/>
        <Button buttonStyle={{width:100,height:50}}title='back'type='outline'onPress={this.props.Rback}/></View>
   </ScrollView>)
    }
}
export class Login extends Component{
    render(){
        return(<ScrollView>
            <View style={style.inputs}>
            <Text style={{marginRight:10,width:20,marginLeft:10,}}>用户名:</Text>
            <TextInput autoFocus='true' style={{height: 40,  borderWidth: 1,borderRadius:15,borderColor:'black',width:280}}
                     placeholder='input username'
                     onChangeText={this.props.Lname}
                     value={this.props.name}/>
            </View>
            <View style={style.inputs}>
            <Text style={{marginRight:10,width:20,marginLeft:10,}}>密码:</Text>
            <TextInput autoFocus='true' style={{height: 40,  borderWidth: 1,borderRadius:15,borderColor:'back',width:280}}
                    placeholder='input password'
                    onChangeText={this.props.Lpassword}
                    value={this.props.password}/>
            </View>
            <CheckBox
                    title='以管理员身份登陆'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={this.props.checked}
                    onPress={this.props.Lcheck}/>
        <View style={style.buttons}>
            <Button buttonStyle={{width:100,height:50}} title='登陆'type='outline' onPress={this.props.Lset}/>
            <Button buttonStyle={{width:100,height:50}} title='注册'type='outline' onPress={this.props.Lre}/>
        </View>
        <View style={{ justifyContent: 'center',
       alignItems: 'center',}}>
        <Button buttonStyle={{width:200,height:60}}title='back'type='outline' onPress={this.props.Rback}/>
        </View>
   </ScrollView>
        )
    }
}
const style=StyleSheet.create({
    container:{
       justifyContent: 'flex-start',
       alignItems: 'center',
    },
    avatar:{
       width:unitWidth*750,
       height:unitWidth*160,
        flexDirection:'row',
        justifyContent: 'center',
       // backgroundColor:'red',
       alignItems: 'center',
       textAlign:'center',
       marginBottom:20*unitWidth,
       margin:unitWidth*10,
    },
    buttons:{
        flexDirection:'row',
        justifyContent: 'space-around',
       // backgroundColor:'red',
       alignItems: 'center',
       textAlign:'center',
       marginTop:10,
       marginBottom:20
    },inputs:{
        flex:1,
        flexDirection:'row',
        justifyContent: 'flex-start',
       // backgroundColor:'red',
       alignItems: 'center',
       textAlign:'center',
       marginTop:10,
       marginBottom:10
    }
})
