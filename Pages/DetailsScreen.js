import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View,Button} from 'react-native'
export class DetailsScreen extends Component{
    static navigationOptions = {
        tabBarLabel: 'Caloal Count',
        //drawerLabel:'页面1'
    };
    render(){
        return(
            <View>
                <Button title='wan' onPress={()=>this.props.navigation.navigate('Users')}/>
            </View>
        );
    }
}