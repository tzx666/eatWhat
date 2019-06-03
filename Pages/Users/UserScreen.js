import React, {Component} from 'react'
import { StyleSheet, Text, View,Button,TouchableHighlight,TextInput,Alert} from 'react-native'
import {unitWidth, width, height}from'../Adapt'
import { ListItem,Overlay,CheckBox } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import{Loginfirst,Users,Regisit,Login}from'D:/eatWhat/components/logins'
import{loginurl,loginsearchurl,superadurl}from 'D:/eatWhat/data/urls.js'
import {storage}from'D:/eatWhat/data/storage'
import { NavigationActions, StackActions } from 'react-navigation';
const resetAction = StackActions.reset({ 
  index: 0, 
  actions: [ 
    NavigationActions.navigate({ routeName: 'Tabs' }), 
  ], 
});
export var userinfo=[]//用户基本信息
userinfo['permission']=-1
//设置用户权限，负责用户登陆
export class UserScreen extends Component{
    static navigationOptions = {header:null};
    constructor(props){
        super(props)
        this.state={isVisible:false,name:'',password:'',email:'',permission:-1,isapplication:false,checked:false}}
        componentDidMount(){
          storage.load({
            key: 'login',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,
    
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
            syncInBackground: true,
    
            // 你还可以给sync方法传递额外的参数
            syncParams: {
                extraFetchOptions: {
                    // 各种参数
                },
                someFlag: true,
            },
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
            // 你只能在then这个方法内继续处理ret数据
            // 而不能在then以外处理
            // 也没有办法“变成”同步返回
            // 你也可以使用“看似”同步的async/await语法
            console.log(ret)
            userinfo['name']=ret.name
            userinfo['password']=ret.password
            userinfo['permission']=ret.permission
            this.setState({name:ret.name,password:ret.password,permission:ret.permission})
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    this.setState({ data: 'NotFoundError' });
                    break;
                case 'ExpiredError':
                    this.setState({ data: 'ExpiredError' });
                    break;
            }
        })
        }
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
               storage.save({
                key: 'login',
                data: {
                    name:this.state.name,
                    password:this.state.password,
                    permission:this.state.permission
                },
                //expires为有效时间
                expires: 1000 * 3600
            })
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
           console.log(this.state.checked)
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
                storage.save({
                  key: 'login',
                  data: {
                      name:this.state.name,
                      password:this.state.password,
                      permission:this.state.permission
                  },
                  //expires为有效时间
                  expires: 1000 * 3600
              })
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
                storage.save({
                  key: 'login',
                  data: {
                      name:this.state.name,
                      password:this.state.password,
                      permission:this.state.permission
                  },
                  //expires为有效时间
                  expires: 1000 * 3600
              })
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
