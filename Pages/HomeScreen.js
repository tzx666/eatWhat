import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View,Button,Dimensions,ScrollView,FlatList,TouchableHighlight} from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {ListItem, Icon,Overlay}from 'react-native-elements'
import {unitWidth, width, height, unitHeight}from'../Pages/Adapt'
import {firstcanteenmeal} from '../data/first'
import {secondcanteenmeal} from '../data/second'
import {thirdcanteenmeal} from '../data/third'
import {fourthcanteenmeal} from '../data/fourth'
import {qzcanteenmeal} from '../data/qingzhen'
console.log(height+" "+width)
export class HomeScreen extends Component{
    static navigationOptions = {
        tabBarLabel: 'Home',
        //drawerLabel:'页面1'
    };
    constructor(props){
        super(props)
        this.state={data:firstcanteenmeal,isVisible:false,choose:[],total:0,userchoose:[]}
        console.log(this.state.data)
    } 
    keyExtractor = (item, index) => index.toString()
    render(){
        return(
            <View >
            <View style={style.toptext}>
            <Text  onPress={()=>this.props.navigation.navigate('Details')}>不知道吃什么？</Text>
            </View>
            <View style={style.bottomborder}></View>
         <View style={{flexDirection:'row',height:1000*unitWidth}}>
             <View style={{width:200*unitWidth,marginBottom:100}}>
             <View style={{marginBottom:140}}>
             <TouchableHighlight style={style.button} onPress={()=>this.setState({data:firstcanteenmeal})}>
                <Text>1食堂</Text>
                </TouchableHighlight>
                <TouchableHighlight style={style.button}onPress={()=>this.setState({data:secondcanteenmeal})}>
                <Text>2食堂</Text>
                </TouchableHighlight>
                <TouchableHighlight style={style.button}onPress={()=>this.setState({data:thirdcanteenmeal})}>
                <Text>3食堂</Text>
                </TouchableHighlight>
                <TouchableHighlight style={style.button}onPress={()=>this.setState({data:fourthcanteenmeal})}>
                <Text>4食堂</Text>
                </TouchableHighlight>
                <TouchableHighlight style={style.button}onPress={()=>this.setState({data:qzcanteenmeal})}>
                <Text>清真食堂</Text>
                </TouchableHighlight>
                </View>
                <View style={style.circle}>
                <TouchableHighlight onPress={()=>{
                    console.log(this.state.data.length)
                    for(let i=0;i<this.state.data.length;i++){
                        if(this.state.data[i].num!=0){
                            this.state.choose.push(this.state.data[i])
                        }
                    }
                    this.setState({isVisible:true,choose:this.state.choose})}}>
                <Icon name="shopping-cart" />
                </TouchableHighlight></View>
            </View>
            <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.data}
            extraData={this.state}
            renderItem={({item}) =>
            <ListItem         
            title={item.name}
            subtitle={
                <View style={{flexDirection:'row',justifyContent: 'space-around',}}>
                <Text >{"价格："+item.price}</Text>
                <View  style={{flexDirection:'row',justifyContent: 'center',}}>
                <TouchableHighlight style={style.button1}onPress={()=>{    
                    this.state.data[item.id-1].num++;
                    this.state.total=this.state.total+item.price;
                    console.log(this.state.total)
                    this.setState({data:this.state.data,total:this.state.total});}}>
                <Icon name="add" />
                </TouchableHighlight>
                <View style={{width:50*unitWidth,height:50*unitWidth,borderWidth:1*unitWidth,textAlign:'center',
        fontSize:20, alignItems:'center',
        justifyContent:'center',}}>
                  <Text >{item.num}</Text>
                  </View>
                  <TouchableHighlight style={style.button1}onPress={()=>{
                   this.state.data[item.id-1].num--;console.log(this.state.data[item.id])
                   this.state.total=this.state.total-item.price
                    console.log(this.state.total)
                    this.setState({data:this.state.data,total:this.state.total})}}>
                <Icon name="remove" />
                </TouchableHighlight>
                </View>
                </View>
              }
              bottomDivider true
            />}
            />
            <Overlay isVisible={this.state.isVisible}>
            <View style={style.menu}>
  <Text style={{fontSize:30,marginBottom:20*unitWidth,borderBottomWidth:1*unitWidth}}>选择清单</Text>
  <ScrollView style={{width:260,height:300,borderWidth:1*unitWidth,borderRadius:15}}>
  {
      this.state.choose.map((item,id)=>(
          <View style={style.text3}>
          <Text style={{height:30}}>{item.name}</Text>
          <Text style={{height:30}}>{"价格:"+item.price+"元"}</Text>
          </View>
      ))
  }
  </ScrollView>
    <Text style={style.text2}>总计 {this.state.total+"元"}</Text>
    <View style={{flexDirection:'row',width:260,height:60}}>
    <TouchableHighlight style={{width:100,height:40,marginRight:20,marginLeft:20,borderWidth:1*unitWidth}}onPress={()=>{
        for(let i=0;i<this.state.data.length;i++){
            this.state.data[i].num=0;
        }
        this.state.userchoose.push(this.state.choose)
        this.state.choose=[]
        this.setState({isVisible:false,choose:this.state.choose,userchoose:this.state.userchoose,data:this.state.data})}
        }>
        <View style={style.textinbutton}>
         <Text style={style.text1}>确定</Text>
           </View> 
        </TouchableHighlight>
  <TouchableHighlight style={{width:100,height:40,marginRight:20,marginLeft:20,borderWidth:1*unitWidth}}onPress={()=>{
      this.state.choose=[]
    this.setState({isVisible:false,choose:this.state.choose})}}>
  <View style={style.textinbutton}>
  <Text style={style.text1}>back</Text>
  </View>
  </TouchableHighlight>
  </View>
  </View>
</Overlay>
         </View>
            </View>
        );
    }
}
const style=StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    toptext:{
        width:unitWidth*750,
        height:unitWidth*375,
        textAlign:'center',
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: 'center',
    } ,bottomborder:{
        width:unitWidth*750,
        height:unitWidth*2,
        borderBottomWidth:1*unitWidth,
        borderBottomColor:'gray',
        marginBottom:2*unitWidth
     },
     circle:{
    marginRight:10,
    alignItems:'center',
    justifyContent:'center',
    width: 40,
    height:40,
    //backgroundColor:'#f76260',
    marginLeft:20,
    borderWidth:1,
    borderColor:'black',
    borderStyle:'solid',
    borderRadius:90,
    paddingBottom:2    
    },
    button:{
        borderColor:'black',
        borderStyle:'solid',
        borderWidth:1*unitWidth,
        borderRadius:15,
        width:200*unitWidth,
        height:80*unitWidth,
        marginBottom:5*unitWidth,
        textAlign:'center',
        fontSize:20, alignItems:'center',
        justifyContent:'center',
        //paddingBottom:20
    },
    button1:{
        color:'white',
        borderColor:'black',
        borderStyle:'solid',
        borderWidth:1*unitWidth,
        borderRadius:15,
        width:50*unitWidth,
        height:50*unitWidth,
        marginBottom:5*unitWidth,
        textAlign:'center',
        fontSize:20, alignItems:'center',
        justifyContent:'center',marginRight:10*unitWidth,marginLeft:10*unitWidth,
    },
    menu:{
        justifyContent:'flex-start',
        alignItems:'center',
        fontSize:30,
        textAlign:'center',
        width:260,
        height:460,
    },
    button3:{
        width:100,height:40,marginRight:20,marginLeft:20,borderWidth:1*unitWidth,borderRadius:15
    },
    textinbutton:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        fontSize:20
    },
    text1:{
        textAlign:'center',
        fontSize:20
    },text2:{
        textAlign:'center',
        fontSize:20,
        paddingBottom:10
    },text3:{
        textAlign:'center',
        fontSize:20,
        borderBottomWidth:1*unitWidth,
        marginBottom:5
    }
});