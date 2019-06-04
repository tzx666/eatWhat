import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View,Picker,TextInput,Alert} from 'react-native'
import {datas}from './MyInformationScreen'
import { ListItem,Overlay,Button  } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Rating, AirbnbRating } from 'react-native-elements';
import {initcanteenmeals}from './MyInformationScreen'
export class scoreformealScreen extends Component{
    static navigationOptions = {
        //tabBarVisible: false, // 隐藏底部导航栏
        header:null,  //隐藏顶部导航栏
      };
      constructor(prpos){
          super(prpos)
          this.state={feature:['早餐','午餐','午晚餐','晚餐','全天供应'],universityname:datas
          ,universitycanteens:['firstmeal', 'fourthcanteen', 'secondmeal', 'thirdcanteen'],
          canteenmeals:initcanteenmeals
            ,selecteduniversity:'buct',selectedcanteen:'firstmeal',isVisible:false,onseocremeal:''
            ,isVisible:false,userscore:3,score:0,scorepeople:0,onseocremealid:-1}
            console.log(this.state.universityname)
      }
    render(){
        if(this.state.universityname.length==0)
        return(<Text>waiting</Text>)
        else{
          return(
            <View>
                <View>
                <Picker
  selectedValue={this.state.selecteduniversity}
  style={{ height: 50, width: 360 }}
  onValueChange={(itemValue, itemIndex) => {
     this.setState({selecteduniversity:itemValue})
    console.log(itemValue)
   
      fetch('http://qt8kjn.natappfree.cc/app-contact/showdatabase.php',{ 
      method: 'post', 
      headers: { 
        "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
      }, 
      body: 'dbname='+itemValue
    })
    .then(res=>res.json()) 
    .then(data=> {   
      this.state.universitycanteens=[]
      for(let i=1;i<=data[0];i++){
        this.state.universitycanteens.push(data[i])
      } 
      this.setState({universitycanteens:this.state.universitycanteens})
      console.log(this.state.universitycanteens)
    }) 
    .catch(function (error) { 
      console.log('Request failed', error); 
    }); 
    }}>
      {
          this.state.universityname.map((item1,i)=>(
               <Picker.Item label={item1.name} value={item1.engname} />
          ))
      }
              </Picker>
              <Picker
  selectedValue={this.state.selectedcanteen}
  style={{ height: 50, width: 360 }}
  onValueChange={(itemValue, itemIndex) => {
    console.log(this.state.selecteduniversity+' '+itemValue)
    this.setState({selectedcanteen:itemValue})
    fetch('http://qt8kjn.natappfree.cc/app-contact/listmeal.php',{ 
      method: 'post', 
      headers: { 
        "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
      }, 
      body: 'dbname='+this.state.selecteduniversity.toString()+'&dbtable='+itemValue
    })
    .then(res=>res.json()) 
    .then(data=> {   
      this.state.canteenmeals=data
      this.setState({canteenmeals:this.state.canteenmeals})
      console.log(this.state.canteenmeals)
    }) 
    .catch(function (error) { 
      console.log('Request failed', error); 
    }); 
    }}>
      {
          this.state.universitycanteens.map((item1,i)=>(
               <Picker.Item label={item1} value={item1} />
          ))
      }
              </Picker>
                <ScrollView>
                {
                  this.state.canteenmeals.map((item,i)=>(
                    <ListItem
                    key={i}
        title={item.name}
        subtitle={(
            <View>
             <Text>价格：{item.price}    供应时间：{item.feature}</Text>
            <View style={{flexDirection:'row'}}>
            <Rating
            ratingCount={5}
            imageSize={20}
            readonly
        startingValue={item.score}
            />
            <Text>({item.scorepeople})</Text>
            </View>
            </View>
        )}
        bottomDivider='true'
        onPress={()=>{this.setState({isVisible:true,onseocremeal:item.name,score:item.score,scorepeople:item.scorepeople,onseocremealid:i})}}
        //设置评分及原来的参数
                    />
                  ))
                } 
                </ScrollView>
                </View>
                <Overlay isVisible={this.state.isVisible}>
                <Rating
  type='star'
  ratingCount={5}
  imageSize={30}
  startingValue={3}
  showRating
  onFinishRating={(rating)=>{ console.log("Rating is: " + rating)
  this.setState({userscore:rating})}}
/>
                <Text>评分完成后请点击下方按钮</Text>
                <Button type='outline' buttonStyle={{marginBottom:5}} title="submit"onPress={()=>{
                    //更新该条的评分和评论人数
                    this.state.scorepeople=parseInt(this.state.scorepeople)+1;
                    console.log(this.state.onseocremealid+" "+this.state.score+" "+this.state.userscore+" "+this.state.scorepeople)
                    this.state.score=(parseFloat(this.state.score)*(parseInt(this.state.scorepeople)-1)+parseFloat(this.state.userscore))/parseInt(this.state.scorepeople)
                    console.log(this.state.selecteduniversity+this.state.selectedcanteen+this.state.onseocremeal+this.state.score+this.state.scorepeople)
                    fetch('http://qt8kjn.natappfree.cc/app-contact/changescore.php',{ 
      method: 'post', 
      headers: { 
        "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
      }, 
      body: 'dbname='+this.state.selecteduniversity.toString()+'&dbtable='+this.state.selectedcanteen.toString()+'&name='+this.state.onseocremeal.toString()+'&score='+this.state.score+'&scorepeople='+this.state.scorepeople
    })
    .then(res=>res.text()) 
    .then(data=> {
        if(data==1){
            Alert.alert("感谢评分")
            this.state.canteenmeals[this.state.onseocremealid]['score']=this.state.score
            this.state.canteenmeals[this.state.onseocremealid]['scorepeople']=this.state.scorepeople
            this.setState({userscore:3,score:this.state.score,scorepeople:this.state.scorepeople,isVisible:false,onseocremealid:-1,canteenmeals:this.state.canteenmeals})
        }   
        else{
            Alert.alert("评分失败，请检查网络或稍后再试吧")
        }
      console.log(data)
    }) 
    .catch(function (error) { 
      console.log('Request failed', error); 
    }); 
                }}/>
                <Button type='outline' buttonStyle={{marginBottom:5}} title="back"onPress={()=>{this.setState({isVisible:false})}}/>
                </Overlay>
            </View>
        )  
        }
        
    }
}