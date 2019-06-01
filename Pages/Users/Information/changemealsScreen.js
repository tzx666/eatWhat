import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View,Button,Picker,TextInput} from 'react-native'
import {datas}from './MyInformationScreen'
import { ListItem,Overlay,CheckBox  } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
export class changemealsScreen extends Component{
    static navigationOptions = {
        //tabBarVisible: false, // 隐藏底部导航栏
        header:null,  //隐藏顶部导航栏
      };
      constructor(prpos){
          super(prpos)
          this.state={name:'',price:0,feature:['早餐','午餐','午晚餐','晚餐','全天供应'],universityname:datas,universitycanteens:['firstmeal', 'fourthcanteen', 'secondmeal', 'thirdcanteen'],canteenmeals:[{ name: '皮蛋粥', price: '2', feature: '全天供应' },
          { name: '小笼包/煎包', price: '6', feature: '全天供应' },
          { name: '蒸饺/煎饺', price: '6', feature: '全天供应' },
          { name: '皮蛋瘦肉粥', price: '2', feature: '全天供应' },
          { name: '鸡蛋', price: '1', feature: '全天供应' },
          { name: '土豆卷饼', price: '4', feature: '全天供应' },
          { name: '肉饼', price: '6', feature: '全天供应' },
          { name: '吊炉饼', price: '4.5', feature: '全天供应' },
          { name: '小碗米饭', price: '0.5', feature: '全天供应' },
          { name: '大碗米饭', price: '1', feature: '全天供应' },
          { name: '小米粥（自选）', price: '1', feature: '早餐' },
          { name: '咸菜', price: '0.5', feature: '早餐' },
          { name: '豆腐脑', price: '1', feature: '早餐' },
          { name: '夹肠蛋饼（自选）', price: '2.5', feature: '早餐' },
          { name: '大碗宽面', price: '10', feature: '全体供应' } ]
            ,selecteduniversity:'buct',selectedcanteen:'',isVisible:false,onchangmeal:'',onchagmealprice:0,onchagmealfeature:''}
      }
    render(){
        return(
            <View>
                <Picker
  selectedValue={this.state.selecteduniversity}
  style={{ height: 100, width: 360 }}
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
  style={{ height: 100, width: 360 }}
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
                <Text>{this.state.selecteduniversity}</Text>
                <ScrollView>
                {
                  this.state.canteenmeals.map((item,i)=>(
                    <ListItem
                    key={i}
        title={item.name}
        subtitle={"价格："+item.price+"    供应时间："+item.feature}
        bottomDivider='true'
        onPress={()=>{this.setState({isVisible:true,onchangmeal:item.name,onchagmealprice:item.price,onchagmealfeature:item.feature})}}
        //设置修改菜单及原来的参数
                    />
                  ))
                } 
                </ScrollView>
                <Overlay isVisible={this.state.isVisible} fullScreen='true'>
            <Text>{this.state.onchangmeal}</Text>
            <Button title="submit" />
            <Button title="back"onPress={()=>{this.setState({isVisible:false})}}/>
          </Overlay>
            </View>
            
        )
    }
}