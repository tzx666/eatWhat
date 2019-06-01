import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View,Button} from 'react-native'
import { Rating, AirbnbRating } from 'react-native-elements';

export class SettingScreen extends Component{
    static navigationOptions = {
        //   tabBarVisible: false, // 隐藏底部导航栏
           header:null,  //隐藏顶部导航栏
         };
         ratingCompleted(rating) {
            console.log("Rating is: " + rating)
          }
    render(){
        return(
            <View>
                <Text>设置</Text>
                <Rating
  type='star'
  ratingCount={5}
  imageSize={30}
  startingValue={3}
  showRating
  onFinishRating={this.ratingCompleted}
/>
<Rating
ratingCount={5}
  imageSize={20}
  readonly
  startingValue={3}
/>
            </View>
        )
    }
}