import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View} from 'react-native'
import {Button}from'react-native-elements'
export class Userfeature extends Component{
    render(){
         return( <View style={style.container}>
    <View style={{textAlign:'center',justifyContent: 'center', alignItems: 'center',}}>
        <Text style={{fontSize:20}}>用户权限</Text>
    <Button buttonStyle={{height:150,width:300,marginBottom:10,marginTop:10}}title='申请管理员'  type='outline'onPress={this.props.navigating}/>
    </View>
    <View >
    <Button buttonStyle={{height:150,width:300,marginBottom:10,}}title='为菜品打分' type='outline' onPress={this.props.preforscore}/>
    </View>
    <View >
    <Button buttonStyle={{height:150,width:300,marginBottom:10}}title='修改菜品' type='outline' onPress={this.props.preforchangemeal}/>
    </View>
</View>)
    }
}
export class Superfeature extends Component{
    render(){
        return( <View style={style.supercontainer}>
                <Text style={style.margin1}>欢迎您，管理员{this.props.name}</Text>
                <Button buttonStyle={{height:150,width:300,marginBottom:20,marginTop:10}}title='修改食堂信息'  type='outline'onPress={this.props.preforcanteen}/>
                <Button buttonStyle={{height:150,width:300,marginBottom:10,marginTop:10}}title='处理修改申请'  type='outline'onPress={this.props.navigating1}/>
            </View>)
    }
}
export const Warning=()=>{
    return(<View style={{justifyContent: 'center',
    alignItems: 'center',textAlign:'center'}}><Text style={{fontSize:40}}>请先登录</Text></View>)
}
const style=StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },supercontainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },margin1:{
        marginBottom:20
    }
})