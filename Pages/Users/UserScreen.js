import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View,Button,TouchableHighlight,TextInput,Alert} from 'react-native'
import { Avatar } from 'react-native-elements';
import {unitWidth, width, height}from'../Adapt'
import { ListItem,Overlay } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
export class UserScreen extends Component{
    static navigationOptions = {header:null};
    constructor(props){
        super(props)
        this.state={isVisible:false,usename:'',password:'',email:'',permission:-1}}
        render(){
            return(
                <View style={style.container}>                         
                      {
                        this.state.permission==-1? <TouchableHighlight onPress={()=>this.setState({isVisible:true})}>
                   <View style={style.avatar}>
                    <Avatar size="large" rounded source={{ uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg', }} />
                    <Text style={{fontSize:50*unitWidth,}}>请先登陆/注册</Text>
                </View></TouchableHighlight>
                :<TouchableHighlight onPress={()=>this.props.navigation.navigate('MyInformation')}>
                <View style={style.avatar}>
        <Avatar size="large" rounded source={{ uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg', }} />
        <Text style={{fontSize:50*unitWidth,}}>普通用户：{this.state.name}</Text>
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
                onPress={() => this.props.navigation.navigate('MyInformation')}/>
                <ListItem style={style.list}
                title='设置'
                leftIcon={{name:'settings'}}
                rightIcon={{name:'chevron-right'}}
                bottomDivider='true'
                onPress={() => this.props.navigation.navigate('Setting')}/>
                <ListItem style={style.list}
                title='关于我们'
                leftIcon={{name:'menu'}}
                rightIcon={{name:'chevron-right'}}
                onPress={() => this.props.navigation.navigate('About')}/>
                </View> 
                <Overlay isVisible={this.state.isVisible} fullScreen="true">
                  <ScrollView>
              <TextInput autoFocus='true' style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                placeholder='input username'
        onChangeText={(name) => this.setState({name})}
        value={this.state.name}/>
        <TextInput autoFocus='true' style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder='input password'
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}/>
        <TextInput autoFocus='true' style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder='input email'
        onChangeText={(email) => this.setState({email})}
        value={this.state.email}/>
        <Button title='登陆'onPress={()=>{   
             fetch('http://192.168.43.40/app-contact/login.php', { 
                method: 'post', 
                headers: { 
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
                }, 
                body: 'name='+this.state.name+'&password='+this.state.password+'&email='+this.state.email
              })
              .then(res=>res.text()) 
              .then((data)=> {
                console.log(data) 
                if(data==1){
                  this.setState({isVisible:false,usename:this.state.name,password:this.state.password,email:this.state.password,permission:1})
                  Alert.alert("登陆成功")
                }
                else if (data==-1){
                  this.setState({isVisible:true,usename:'',password:'',email:'',permission:-1})
                  Alert.alert("密码错误，请联系管理员")     
                }
                else if (data==0){
                  this.setState({isVisible:true,usename:'',password:'',email:'',permission:-1})
                  Alert.alert("注册失败，请联系管理员")    
                }
              }) 
              .catch(function (error) { 
                console.log('Request failed', error); 
              }
              ); 
           }}/>
               <Button title='back'onPress={()=>this.setState({isVisible:false})}/>
               </ScrollView>
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
