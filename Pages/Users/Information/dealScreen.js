import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View,Picker,TextInput,Alert} from 'react-native'
import { ListItem,Overlay,CheckBox,Button  } from 'react-native-elements';
import {userinfo}from '../UserScreen'
import{addmealurl,deletemealurl,listonchangeurl}from 'D:/eatWhat/data/urls.js'
export class dealScreen extends Component{
    static navigationOptions = {
        header:null,
      };
      constructor(prpos){
          super(prpos)
          this.state={data:[]}
      }
      componentDidMount(){
        fetch(listonchangeurl,{ 
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
                      title={"菜名:"+l.name+"        预计上传食堂:"+l.dbtable}
                      subtitle={(<View style={{marginTop:8}}> 
                        <Text style={{marginBottom:10}}>{"价格:"+l.price+"      供应时间:"+l.feature}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                            <Button type='outline' title="提交"onPress={()=>{
                                fetch(deletemealurl,{ 
                                    method: 'post', 
                                    headers: { 
                                      "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
                                    }, 
                                    body: 'dbname=onchangemeal'+'&dbtable='+l.dbname+'&name='+l.name
                                  })
                                  .then(res=>res.text()) 
                                  .then(data=> {   
                                     console.log(data)
                                      fetch(addmealurl,{ 
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
                            <Button type='outline'title="删除"onPress={()=>{
                                fetch(deletemealurl,{ 
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
                <Text style={{fontSize:30,marginBottom:50}}>暂无需要处理的请求</Text>
                <Button type='outline'title="返回"onPress={()=>this.props.navigation.navigate('MyInformation')}/>
            </View>)
        }
    }
}