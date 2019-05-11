import React, { Component } from 'react';
import{View}from  'react-native';
import Container from'./Pages/Navigation'
export default class App extends Component{
  render(){
    return(
      <View style={{flex: 1}}>
                <Container/>
            </View>
    );
  }
}
