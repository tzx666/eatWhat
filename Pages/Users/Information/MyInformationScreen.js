import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View} from 'react-native'
import {Button}from'react-native-elements'
export class MyInformationScreen extends Component{
    static navigationOptions = {
        //   tabBarVisible: false, // 隐藏底部导航栏
           header:null,  //隐藏顶部导航栏
           header:null,
         };
    render(){
        return(
            <View style={style.container}>
                <View style={{textAlign:'center',justifyContent: 'center', alignItems: 'center',}}>
                    <Text style={{fontSize:15}}>用户权限</Text>
                <Button buttonStyle={{height:150,width:300,marginBottom:10,marginTop:10}}title='申请管理员'  type='outline'onPress={()=>this.props.navigation.navigate('requestpre')}/>
                </View>
                <View >
                <Button buttonStyle={{height:150,width:300,marginBottom:10,}}title='为菜品打分' type='outline' onPress={()=>this.props.navigation.navigate('scoreformeal')}/>
                </View>
                <View >
                <Button buttonStyle={{height:150,width:300,marginBottom:10}}title='修改菜品' type='outline' onPress={()=>this.props.navigation.navigate('changemeals')}/>
                </View>
            </View>
        )
    }
}
const style=StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})