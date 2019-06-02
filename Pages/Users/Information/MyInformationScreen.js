import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View} from 'react-native'
import {Button}from'react-native-elements'
import {userinfo}from'../UserScreen'
export var datas=[]
export var superdatas=[]
export var superdatamealss=[]
export var initcanteenmeals=[]
export class MyInformationScreen extends Component{
    static navigationOptions = {
        //   tabBarVisible: false, // 隐藏底部导航栏
           header:null,  //隐藏顶部导航栏
           header:null,
         };
    render(){
        console.log(userinfo)
        if(userinfo.permission==-1)
        return(<View><Text>请先登录</Text></View>)
        else if(userinfo.permission==1){
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
       
        } else {
            return(<View>
                <Text>欢迎您，管理员{userinfo.name}</Text>
                <Button buttonStyle={{height:150,width:300,marginBottom:10,marginTop:10}}title='修改食堂信息'  type='outline'onPress={()=>{
                    fetch('http://192.168.43.40/app-contact/showdatabase.php',{ 
                        method: 'post', 
                        headers: { 
                          "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
                        }, 
                        body: 'dbname='+userinfo.universityid
                      })
                      .then(res=>res.json()) 
                      .then(data=> {   
                        superdatas=[]
                        for(let i=1;i<=data[0];i++){
                          superdatas.push(data[i])
                        }
                        fetch('http://192.168.43.40/app-contact/listmeal.php',{ 
                            method: 'post', 
                            headers: { 
                              "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
                            }, 
                            body: 'dbname='+userinfo.universityid+'&dbtable='+superdatas[0].toString()
                          })
                          .then(res=>res.json()) 
                          .then(data=> {
                              if(data!=-2)   
                            superdatamealss=data;
                            else
                            superdatamealss=[{name:'当前暂无菜品，请先添加'}]
                            console.log(superdatamealss) 
                            this.props.navigation.navigate('deal1')
                          }) 
                          .catch(function (error) { 
                            console.log('Request failed', error); 
                          }); 
                        console.log(superdatas)
                      }) 
                      .catch(function (error) { 
                        console.log('Request failed', error); 
                      }); 
                   }}/>
                <Button buttonStyle={{height:150,width:300,marginBottom:10,marginTop:10}}title='处理修改申请'  type='outline'onPress={()=>this.props.navigation.navigate('deal2')}/>
            </View>)
        }
    }
}
const style=StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})