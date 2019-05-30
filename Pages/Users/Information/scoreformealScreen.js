import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View,Button} from 'react-native'
export class scoreformealScreen extends Component{
   
    static navigationOptions = {
     //   tabBarVisible: false, // 隐藏底部导航栏
        header:null,  //隐藏顶部导航栏
      };
      constructor(props){
           let meals=[]
          super(props)
          this.state={data:meals}
      }
      componentDidMount(){
          
      }
    render(){
        return(
            <View>
                <Text>jifen</Text>
            </View>
        )
    }
}