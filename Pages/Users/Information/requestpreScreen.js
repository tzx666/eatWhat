import React, {Component} from 'react'
import {StyleSheet, Text, View,Alert,TextInput} from 'react-native'
import {datas}from './MyInformationScreen'
import {userinfo}from '../UserScreen'
import {Button} from 'react-native-elements';
export class requestpreScreen extends Component{
    static navigationOptions = {
      //  tabBarVisible: false, // 隐藏底部导航栏
        header:null,  //隐藏顶部导航栏
      };
      constructor(prpos){
        super(prpos)
        this.state={universityname:'',university:'',texts:'',isadd:0}
          console.log(this.state.universityname)
    }
    render(){
        return(
            <View style={style.container}>
                <Text style={{fontSize:30}}>申请超级管理员</Text>
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                  <Text style={{width:80}}>申请大学:</Text>
                        <TextInput autoFocus='true' style={{height: 40, width:280, borderColor: 'gray', borderWidth: 1,marginBottom:5,borderRadius:15}}
                       placeholder='输入想添加的大学名称'
                      onChangeText={(universityname) => this.setState({universityname})}
                      value={this.state.universityname}/>
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                  <Text style={{width:80}}>申请大学ID:</Text>
        <TextInput autoFocus='true' style={{height: 40,width:280,  borderColor: 'gray', borderWidth: 1,marginBottom:5,borderRadius:15}}
        placeholder='输入申请学院的缩写(3字或4字ex：buct/pku)'
        onChangeText={(university) => this.setState({university})}
        value={this.state.university}/></View>
        <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
        <Text style={{width:80}}>申请理由:</Text>
<TextInput autoFocus='true' style={{height: 40,width:280, borderColor: 'gray', borderWidth: 1,marginBottom:40,borderRadius:15}}
        placeholder='申请理由'
        onChangeText={(texts) => this.setState({texts})}
        value={this.state.texts}/></View>
          <Button type='outline'title='申请' buttonStyle={{width:300,height:60}} onPress={()=>{
            //首先检测该学校是否存在，如果存在提示无法申请，如果不存在且申请字数大于20，申请通过，否则申请不通过,数据库创建成功后，将用户信息添加到数据库
            for(let i in datas){
              if(datas[i]['name']==this.state.universityname&&this.state.university==datas[i]['engname']){
                Alert.alert("该学校已有管理员，请申请其他学校")
                this.setState({isadd:1})
                break;
              }
            }
            if(this.state.isadd==0){
                fetch('http://192.168.43.40/app-contact/createnewschool.php',{ 
          method: 'post', 
            headers: { 
        "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
        }, 
        body: 'dbname='+this.state.universityname+'&dbnameid='+this.state.university
})
.then(res=>res.text()) 
.then(data=> {   
 console.log(data)
if(data==1){
    fetch('http://192.168.43.40/app-contact/addsuperad.php',{ 
method: 'post', 
headers: { 
"Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
}, 
body: 'name='+userinfo.username+'&password='+userinfo.password+'&universityname='+this.state.universityname+'&university='+this.state.university
})
.then(res=>res.text()) 
.then(data=> {   
console.log(data)
if(data==1){
Alert.alert("申请成功")
userinfo.permission=2
userinfo['universityid']=this.state.university
this.props.navigation.navigate('Home')
}
else{
Alert.alert("注册失败")
}
}) 
.catch(function (error) { 
console.log('Request failed', error); 
});     
}
else{
  Alert.alert("注册失败")
}
}) 
.catch(function (error) { 
console.log('Request failed', error); 
});     
            }
          }}/>
            </View>
        )
    }
}
const style=StyleSheet.create({
  container:{
     justifyContent: 'flex-start',
     alignItems: 'center',
     textAlign:'center',
  },
})
