import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View,Button,Picker,TextInput,Alert} from 'react-native'
import { ListItem,Overlay,CheckBox  } from 'react-native-elements';
import {userinfo}from '../UserScreen'
export class dealScreen extends Component{
    static navigationOptions = {
        //tabBarVisible: false, // 隐藏底部导航栏
        header:null,  //隐藏顶部导航栏
      };
      constructor(prpos){
          super(prpos)
          this.state={data:[]}
      }
      componentDidMount(){
        console.log(userinfo['universityid'])
        fetch('http://192.168.43.40/app-contact/listonchange.php',{ 
            method: 'post', 
            headers: { 
              "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
            }, 
            body: 'dbtable='+userinfo['universityid']
          })
          .then(res=>res.json()) 
          .then(data=> {   
              this.state.data=[]
              for(i in data)
              this.state.data.push(data[i])
            this.setState({data:this.state.data})
            console.log(this.state.data)
          }) 
          .catch(function (error) { 
            console.log('Request failed', error); 
          }); 
      }
    render(){
        if(this.state.data.length!=0){
            return(
        <View>
            {
                 this.state.data.map((l, i) => (
                    <ListItem
                      key={i}
                      title={l.name+"     "+l.dbtable}
                      subtitle={(<View> 
                        <Text>{l.price+" "+l.feature}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                            <Button title="提交"onPress={()=>{
                                fetch('http://192.168.43.40/app-contact/deletemeal.php',{ 
                                    method: 'post', 
                                    headers: { 
                                      "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
                                    }, 
                                    body: 'dbname=onchangemeal'+'&dbtable='+l.dbname+'&name='+l.name
                                  })
                                  .then(res=>res.text()) 
                                  .then(data=> {   
                                     console.log(data)
                                      fetch('http://192.168.43.40/app-contact/addmeal.php',{ 
                                    method: 'post', 
                                    headers: { 
                                      "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
                                    }, 
                                    body: 'dbname='+l.dbname+'&dbtable='+l.dbtable+'&name='+l.name+'&price='+l.price+'&feature='+l.feature
                                  })
                                  .then(res=>res.text()) 
                                  .then(data=> {   
                                     
                                     if(data==1){
                                        this.state.data.splice(i,1)
                                         this.setState({data:this.state.data})
                                     Alert.alert("新增菜品成功") 
                                     }
                                    
                                     else
                                     Alert.alert("新增菜品失败")
                                  }) 
                                  .catch(function (error) { 
                                    console.log('Request failed', error); 
                                  }); 
                                  }) 
                                  .catch(function (error) { 
                                    console.log('Request failed', error); 
                                  }); 
                               
                            }}/>
                            <Button title="删除"onPress={()=>{
                                fetch('http://192.168.43.40/app-contact/deletemeal.php',{ 
                                    method: 'post', 
                                    headers: { 
                                      "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
                                    }, 
                                    body:  'dbtable='+l.dbname+'&name='+l.name
                                  })
                                  .then(res=>res.text()) 
                                  .then(data=> {   
                                     if(data==1){
                                         this.setState({data:this.state.data.splice(i,1)})
                                         Alert.alert("删除成功")
                                     }
                                     else
                                     Alert.alert("删除失败")
                                  }) 
                                  .catch(function (error) { 
                                    console.log('Request failed', error); 
                                  }); 
                            }}/>
                        </View>
                        </View>)}
                        bottomDivider='true'
                    />
                  ))
            }
        </View>
        )
        }
        else{
            return( <View>
                <Text>暂无需要处理的请求</Text>
            </View>)
        }
        
    }
}