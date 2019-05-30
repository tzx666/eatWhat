import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View,Button,TouchableHighlight,TextInput,Alert} from 'react-native'
import { Avatar } from 'react-native-elements';
import {unitWidth, width, height}from'../Adapt'
import { gray } from 'ansi-colors';
import { ListItem,Overlay } from 'react-native-elements'
import { Icon } from 'react-native-elements'
export var userinfo={name:'',password:'',email:''};
export class UserScreen extends Component{
    static navigationOptions = {
      //  tabBarLabel: '我的',
        //drawerLabel:'页面1'
        header:null
    };
    constructor(props){
        super(props)
        this.state={isVisible:false,usename:'',password:'',email:''}
          }
        render(){
            return(
                <View style={style.container}>
                   
                        {
                      userinfo['name']==''? <TouchableHighlight onPress={()=>this.setState({isVisible:true})}>
                   <View style={style.avatar}>
                    <Avatar size="large" rounded source={{ uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg', }} />
                    <Text style={{fontSize:50*unitWidth,}}>请先登陆</Text>
                </View></TouchableHighlight>
                :<TouchableHighlight onPress={()=>this.props.navigation.navigate('MyInformation')}>
                <View style={style.avatar}>
        <Avatar size="large" rounded source={{ uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg', }} />
        <Text style={{fontSize:50*unitWidth,}}>用户：{this.state.name}</Text>
    </View></TouchableHighlight>
                        }              
                <View style={style.bottomborder}></View>
                 <View >
                    <ListItem style={style.list}
                title='历史选餐'
                leftIcon={{name:'timer'}}
                rightIcon={{name:'chevron-right'}}
                bottomDivider='true'
                onPress={() => this.props.navigation.navigate('History')}
                />
                  <ListItem style={style.list}
                title='我的信息'
                leftIcon={{name:'person'}}
                rightIcon={{name:'chevron-right'}}
                bottomDivider='true'
                onPress={() => this.props.navigation.navigate('MyInformation')}
                />
                <ListItem style={style.list}
                title='设置'
                leftIcon={{name:'settings'}}
                rightIcon={{name:'chevron-right'}}
                bottomDivider='true'
                onPress={() => this.props.navigation.navigate('Setting')}
                /><ListItem style={style.list}
                title='关于我们'
                leftIcon={{name:'menu'}}
                rightIcon={{name:'chevron-right'}}
                onPress={() => this.props.navigation.navigate('About')}
                />
                </View> 
                <Overlay isVisible={this.state.isVisible}>
              <TextInput  style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                placeholder='input username'
        onChangeText={(name) => this.setState({name})}
        value={this.state.name}/>
        <TextInput  style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder='input password'
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}/>
        <TextInput  style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder='input email'
        onChangeText={(email) => this.setState({email})}
        value={this.state.email}/>
        <Button title='submit'onPress={()=>{
                  userinfo['name']=this.state.name
                  userinfo['password']=this.state.password
                  userinfo['email']=this.state.email
                  console.log(userinfo)
            console.log(name)
             fetch('http://192.168.43.40/app-contact/login.php', { 
                method: 'post', 
                headers: { 
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
                }, 
                body: 'name='+this.state.name+'&password='+this.state.password+'&email='+this.state.email
              })
              .then(res=>res.text()) 
              .then(function (data) { 
                if(data==1){
                  Alert.alert("注册成功")
                }
                console.log(data); 
              }) 
              .catch(function (error) { 
                console.log('Request failed', error); 
              }); 
            this.setState({isVisible:false})}}/>
               <Button title='back'onPress={()=>this.setState({isVisible:false})}/>
              </Overlay>
                </View>
               
            );
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
         justifyContent: 'flex-start',
        // backgroundColor:'red',
        alignItems: 'center',
        textAlign:'center',
        marginBottom:20*unitWidth,
        margin:unitWidth*10,
     },
     bottomborder:{
        width:unitWidth*750,
        height:unitWidth*1,
        borderBottomWidth:1*unitWidth,
        marginBottom:2*unitWidth,
        borderBottomColor:'gray',
     },
     list:{
        width:unitWidth*750,
        height:unitWidth*120,
     }
 })
