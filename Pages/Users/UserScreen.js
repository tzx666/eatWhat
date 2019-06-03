import React, {Component} from 'react'
import { StyleSheet, Text, View,Button,TouchableHighlight,TextInput,Alert} from 'react-native'
import {unitWidth, width, height}from'../Adapt'
import { ListItem,Overlay,CheckBox } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import{Loginfirst,Users,Regisit,Login}from'D:/eatWhat/components/logins'
import{loginurl,loginsearchurl,superadurl}from 'D:/eatWhat/data/urls.js'
export var userinfo=[]//用户基本信息
userinfo['permission']=-1
//设置用户权限，负责用户登陆
export class UserScreen extends Component{
    static navigationOptions = {header:null};
    constructor(props){
        super(props)
        this.state={isVisible:false,name:'',password:'',email:'',permission:-1,isapplication:false,checked:false}}
      _loginfirst=()=>this.setState({isVisible:true})
        _loginusers=()=>this.props.navigation.navigate('MyInformation')
        Rname=(name) => this.setState({name})
        Rpassword=(password) => this.setState({password})
        Lname=(name) => this.setState({name})
        Lpassword=(password) => this.setState({password})
        Lcheck=() => this.setState({checked: !this.state.checked})
        Remail=(email) => this.setState({email})
        Lre=()=>this.setState({isapplication:true})
        Rset=()=>{   //login fetch
          fetch(loginurl, { 
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
         }
         Lset=()=>{ 
          if(this.state.checked==false){
           fetch(loginsearchurl, { 
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
          fetch(superadurl, { 
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
          }
        Rback=()=>this.setState({isVisible:false,isapplication:false})
        render(){
            return(
                <View style={style.container}>                         
{this.state.permission==-1? <Loginfirst loginfirst={this._loginfirst}/>:
<Users loginusers={this._loginusers} permission={this.state.permission} name={this.state.name}/>}             
                <View style={style.bottomborder}></View>
                 <View>
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
                      this.state.isapplication==true?<Regisit Rname={this.Rname}
                      Rpassword={this.Rpassword}
                      Remail={this.Remail}
                      Rback={this.Rback}
                      Rset={this.Rset}
                      name={this.state.name}
                      password={this.state.password}
                      email={this.state.email}/>:<Login Lname={this.Lname}
                      Lpassword={this.Lpassword}Lcheck={this.Lcheck}name={this.state.name}password={this.state.password}
                      Lset={this.Lset}Rback={this.Rback}Lre={this.Lre}checked={this.state.checked}/>
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
