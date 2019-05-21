import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View,Button} from 'react-native'
import { Avatar } from 'react-native-elements';
import {unitWidth, width, height}from'../Adapt'
import { gray } from 'ansi-colors';
import { ListItem } from 'react-native-elements'
import { Icon } from 'react-native-elements'
export class UserScreen extends Component{
    static navigationOptions = {
        tabBarLabel: '我的',
        //drawerLabel:'页面1'
    };
        render(){
            return(
                <View style={style.container}>
                <View style={style.avatar}>
                    <Avatar size="large" rounded source={{ uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg', }} />
                    <Text style={{fontSize:50*unitWidth,}}>用户e5sf</Text>
                </View>
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
