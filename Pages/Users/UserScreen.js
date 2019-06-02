import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View,Button,TouchableHighlight,TextInput,Alert} from 'react-native'
import { Avatar } from 'react-native-elements';
import {unitWidth, width, height}from'../Adapt'
import { ListItem,Overlay,CheckBox } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
export var userinfo=[]
userinfo['permission']=-1
export class UserScreen extends Component{
    static navigationOptions = {header:null};
    constructor(props){
        super(props)
        this.state={isVisible:false,usename:'',password:'',email:'',permission:-1,isapplication:false,checked:false}}
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
        {
         userinfo.permission==1?<Text style={{fontSize:50*unitWidth,}}>普通用户：{this.state.name}</Text>:
          <Text style={{fontSize:50*unitWidth,}}>管理员：{this.state.name}</Text>
        }
        
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
                    {
                      this.state.isapplication==true?(
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
        <Button title='注册'onPress={()=>{   
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
                  
                  this.setState({isVisible:false,name:this.state.name,password:this.state.password,email:this.state.email,permission:1})
                  userinfo['username']=this.state.name
                  userinfo['password']=this.state.password
                  userinfo['email']=this.state.email
                  userinfo['permission']=this.state.permission
                  Alert.alert("注册成功")
                }
                else if (data==6){
                  this.setState({isVisible:true,usename:'',password:'',email:'',permission:-1})
                  Alert.alert("该用户已存在！")     
                  userinfo['permission']=-1
                }
                else if (data==0){
                  this.setState({isVisible:true,usename:'',password:'',email:'',permission:-1})
                  userinfo['permission']=-1
                  Alert.alert("注册失败，请联系管理员")    
                }
              }) 
              .catch(function (error) { 
                console.log('Request failed', error); 
              }
              ); 
           }}/>
               <Button title='back'onPress={()=>this.setState({isVisible:false,isapplication:false})}/>
               </ScrollView>):(<ScrollView>
                        <TextInput autoFocus='true' style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                placeholder='input username'
        onChangeText={(name) => this.setState({name})}
        value={this.state.name}/>
        <TextInput autoFocus='true' style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder='input password'
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}/>
        <CheckBox
  title='以管理员身份登陆'
  checkedIcon='dot-circle-o'
  uncheckedIcon='circle-o'
  checked={this.state.checked}
  onPress={() => this.setState({checked: !this.state.checked})}
/>
        <Button title='登陆'onPress={()=>{ 
          if(this.state.checked==false){
             fetch('http://192.168.43.40/app-contact/loginsearch.php', { 
                method: 'post', 
                headers: { 
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
                }, 
                body: 'name='+this.state.name+'&password='+this.state.password
              })
              .then(res=>res.text()) 
              .then((data)=> {
                console.log(data) 
                if(data==1){
                  
                  this.setState({isVisible:false,name:this.state.name,password:this.state.password,email:this.state.email,permission:1})
                  userinfo['username']=this.state.name
                  userinfo['password']=this.state.password
                  userinfo['email']=this.state.email
                  userinfo['permission']=this.state.permission
                  console.log(userinfo)
                  Alert.alert("登陆成功")
                }
                else if (data==-1){
                  this.setState({isVisible:true,usename:'',password:'',email:'',permission:-1})
                  Alert.alert("用户不存在，请先注册!")     
                  userinfo['permission']=-1
                  console.log(userinfo)
                }
                else {
                  this.setState({isVisible:true,usename:'',password:'',email:'',permission:-1})
                  userinfo['permission']=-1
                  console.log(userinfo)
                  Alert.alert("密码错误!")    
                }
              }) 
              .catch(function (error) { 
                console.log('Request failed', error); 
              }
              ); 
          }else{
//检测是否具备管理员权限
fetch('http://192.168.43.40/app-contact/superad.php', { 
                method: 'post', 
                headers: { 
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
                }, 
                body: 'name='+this.state.name+'&password='+this.state.password
              })
              .then(res=>res.text()) 
              .then((data)=> {
                console.log(data) 
                if(data!=0){
                  this.setState({isVisible:false,usename:this.state.name,password:this.state.password,permission:2})
                  userinfo['username']=this.state.name
                  userinfo['password']=this.state.password
                  userinfo['permission']=this.state.permission
                  userinfo['universityid']=data
                  console.log(userinfo)
                  Alert.alert("管理员登陆成功")
                }
                else if (data==-1){
                  this.setState({isVisible:true,usename:'',password:'',email:'',permission:-1})
                  Alert.alert("您没有管理员权限，请先申请!")     
                  userinfo['permission']=-1
                  console.log(userinfo)
                }
                else {
                  this.setState({isVisible:true,usename:'',password:'',email:'',permission:-1})
                  userinfo['permission']=-1
                  console.log(userinfo)
                  Alert.alert("密码错误!")    
                }
              }) 
              .catch(function (error) { 
                console.log('Request failed', error); 
              }
              ); 
          } 
           }}/>
           <Button title='注册'onPress={()=>this.setState({isapplication:true})}/>
               <Button title='back'onPress={()=>this.setState({isVisible:false,isapplication:false})}/>
               </ScrollView>
                    )
                    }          
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
