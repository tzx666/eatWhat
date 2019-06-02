import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View} from 'react-native'
import {Button}from'react-native-elements'
export var datas=[]
export var initcanteenmeals=[]
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
                <Button buttonStyle={{height:150,width:300,marginBottom:10,}}title='为菜品打分' type='outline' onPress={()=>{ 
                        fetch('http://192.168.43.40/app-contact/getdatebase.php')
                    .then(res=>res.json()) 
                    .then(data=> {  
                      datas=data
                      fetch('http://192.168.43.40/app-contact/listmeal.php',{ 
      method: 'post', 
      headers: { 
        "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
      }, 
      body: 'dbname=buct&dbtable=firstmeal'
    })
    .then(res=>res.json()) 
    .then(data=> {   
     initcanteenmeals=data
       console.log(initcanteenmeals)
     this.props.navigation.navigate('scoreformeal')
    }) 
    .catch(function (error) { 
      console.log('Request failed', error); 
    }); 
                       
                    }) 
                    .catch(function (error) { 
                      console.log('Request failed', error); 
                    });  
                  
                   
                }}/>
                </View>
                <View >
                <Button buttonStyle={{height:150,width:300,marginBottom:10}}title='修改菜品' type='outline' onPress={()=>
                    {   fetch('http://192.168.43.40/app-contact/getdatebase.php')
                    .then(res=>res.json()) 
                    .then(data=> { 
                      console.log(data);   
                      datas=data
                      fetch('http://192.168.43.40/app-contact/listmeal.php',{ 
                        method: 'post', 
                        headers: { 
                          "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
                        }, 
                        body: 'dbname=buct&dbtable=firstmeal'
                      })
                      .then(res=>res.json()) 
                      .then(data=> {   
                       initcanteenmeals=data
                         console.log(datas+initcanteenmeals)
                       this.props.navigation.navigate('changemeals')
                      }) 
                      .catch(function (error) { 
                        console.log('Request failed', error); 
                      }); 
                    }) 
                    .catch(function (error) { 
                      console.log('Request failed', error); 
                    }); 
                       }}/>
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