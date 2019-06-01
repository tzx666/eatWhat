import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View,Button,Picker,TextInput,Alert} from 'react-native'
import {datas}from './MyInformationScreen'
import { ListItem,Overlay,CheckBox  } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Rating, AirbnbRating } from 'react-native-elements';
export class scoreformealScreen extends Component{
    static navigationOptions = {
        //tabBarVisible: false, // 隐藏底部导航栏
        header:null,  //隐藏顶部导航栏
      };
      constructor(prpos){
          super(prpos)
          this.state={feature:['早餐','午餐','午晚餐','晚餐','全天供应'],universityname:datas
          ,universitycanteens:['firstmeal', 'fourthcanteen', 'secondmeal', 'thirdcanteen'],
          canteenmeals:[{ name: '皮蛋粥', price: '2', feature: '全天供应',score:0,scorepeople:0 },
          { name: '小笼包/煎包', price: '6', feature: '全天供应',score:0,scorepeople:0 },
          { name: '蒸饺/煎饺', price: '6', feature: '全天供应',score:0,scorepeople:0 },
          { name: '皮蛋瘦肉粥', price: '2', feature: '全天供应',score:0,scorepeople:0 },
          { name: '鸡蛋', price: '1', feature: '全天供应',score:0,scorepeople:0 },
          { name: '土豆卷饼', price: '4', feature: '全天供应',score:0,scorepeople:0 },
          { name: '肉饼', price: '6', feature: '全天供应',score:0,scorepeople:0 },
          { name: '吊炉饼', price: '4.5', feature: '全天供应',score:0,scorepeople:0 },
          { name: '小碗米饭', price: '0.5', feature: '全天供应',score:0,scorepeople:0 },
          { name: '大碗米饭', price: '1', feature: '全天供应',score:0,scorepeople:0 },
          { name: '小米粥（自选）', price: '1', feature: '早餐',score:0,scorepeople:0 },
          { name: '咸菜', price: '0.5', feature: '早餐',score:0,scorepeople:0 },
          { name: '豆腐脑', price: '1', feature: '早餐',score:0,scorepeople:0 },
          { name: '夹肠蛋饼（自选）', price: '2.5', feature: '早餐',score:0,scorepeople:0 },
          { name: '大碗宽面', price: '10', feature: '全体供应',score:0,scorepeople:0 } ]
            ,selecteduniversity:'buct',selectedcanteen:'firstmeal',isVisible:false,onchangmeal:'',onchagmealprice:0,onchagmealfeature:''}
            console.log(this.state.universityname)
      }
    render(){
        if(this.state.universityname==[])
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
   
      fetch('http://192.168.43.40/app-contact/showdatabase.php',{ 
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
    fetch('http://192.168.43.40/app-contact/listmeal.php',{ 
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
             <Text>价格：+{item.price}+    供应时间：+{item.feature}</Text>
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
        //设置修改菜单及原来的参数
                    />
                  ))
                } 
                </ScrollView>
                </View>
            </View>
        )  
        }
        
    }
}