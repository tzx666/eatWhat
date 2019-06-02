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
//import{userchoose}from '../data/userchoose'
export var userchoose=[]
console.log(height+" "+width)
export class HomeScreen extends Component{
    static navigationOptions = {
        tabBarLabel: 'Home',
        //drawerLabel:'页面1'
    };
    constructor(props){
        super(props)
        this.state={data:firstcanteenmeal,isVisible:false,choose:[],
            total:0,color:'white',color1:'white',color2:'white',color3:'white',color4:'white'}
        console.log(this.state.data)
    } 
    componentDidMount(){

    }
getmyDate() {
    var date = new Date();

    var year = date.getFullYear().toString();
    var month = (date.getMonth()+1).toString();
    var day = date.getDate().toString();
    var hour =  date.getHours().toString();
    var minute = date.getMinutes().toString();

    return year+'年'+month+'月'+day+'日'+' '+hour+':'+minute;
};
addcount=({item})=>{
    console.log(item)
    this.state.data[item.id-1].num++;
    this.state.total=this.state.total+item.price;
    console.log(this.state.total)
    this.setState({data:this.state.data,total:this.state.total});
}
decendcount=({item})=>{
    console.log(item)
    this.state.data[item.id-1].num--;console.log(this.state.data[item.id])
    this.state.total=this.state.total-item.price
     console.log(this.state.total)
     this.setState({data:this.state.data,total:this.state.total})
}
    keyExtractor = (item, index) => index.toString()
    render(){
        return(
            <View>
            <View style={style.toptext}>
            <Text style={{fontSize:40}} onPress={()=>this.props.navigation.navigate('Details')}>不知道吃什么？</Text>
            </View>
            <View style={style.bottomborder}></View>
         <View style={{flexDirection:'row',height:1000*unitWidth}}>
             <View style={{width:200*unitWidth,marginBottom:100}}>
             <View style={{marginBottom:140}}>
             <TouchableHighlight style={[style.button01,{backgroundColor:this.state.color}]} onPress={()=>this.setState({data:firstcanteenmeal,color:'#FF7F00',color1:'white',color2:'white',color3:'white',color4:'white'})}>
                <Text>1食堂</Text>
                </TouchableHighlight>
                <TouchableHighlight style={[style.button02,{backgroundColor:this.state.color1}]}onPress={()=>this.setState({data:secondcanteenmeal,color:'white',color1:'#FF7F00',color2:'white',color3:'white',color4:'white'})}>
                <Text>2食堂</Text>
                </TouchableHighlight>
                <TouchableHighlight style={[style.button03,{backgroundColor:this.state.color2}]}onPress={()=>this.setState({data:thirdcanteenmeal,color:'white',color1:'white',color2:'#FF7F00',color3:'white',color4:'white'})}>
                <Text>3食堂</Text>
                </TouchableHighlight>
                <TouchableHighlight style={[style.button04,{backgroundColor:this.state.color3}]}onPress={()=>this.setState({data:fourthcanteenmeal,color:'white',color1:'white',color2:'white',color3:'#FF7F00',color4:'white'})}>
                <Text>4食堂</Text>
                </TouchableHighlight>
                <TouchableHighlight style={[style.button05,{backgroundColor:this.state.color4}]}onPress={()=>this.setState({data:qzcanteenmeal,color:'white',color1:'white',color2:'white',color3:'white',color4:'#FF7F00'})}>
                <Text>清真食堂</Text>
                </TouchableHighlight>
                </View>
                <View style={style.circle}>
                <TouchableHighlight onPress={()=>{
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
            bottomDivider true
            subtitle={
                <View style={{flexDirection:'row',justifyContent: 'space-around',}}>
                <Text >{"价格："+item.price}</Text>
                <View  style={{flexDirection:'row',justifyContent: 'center',}}>
                <TouchableHighlight style={style.button1}onPress={this.addcount
                    /* ()=>{    
                    this.state.data[item.id-1].num++;
                    this.state.total=this.state.total+item.price;
                    console.log(this.state.total)
                    this.setState({data:this.state.data,total:this.state.total});}*/}>
                <Icon name="add" />
                </TouchableHighlight>
                <View style={{width:50*unitWidth,height:50*unitWidth,borderWidth:1*unitWidth,textAlign:'center',
        fontSize:20, alignItems:'center',
        justifyContent:'center',}}>
                  <Text >{item.num}</Text>
                  </View>
                  <TouchableHighlight style={style.button1}onPress={this.decendcount
                      /* ()=>{
                   this.state.data[item.id-1].num--;console.log(this.state.data[item.id])
                   this.state.total=this.state.total-item.price
                    console.log(this.state.total)
                    this.setState({data:this.state.data,total:this.state.total})}*/}>
                <Icon name="remove" />
                </TouchableHighlight>
                </View>
                </View>
              }
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
        this.state.choose['time']=this.getmyDate()
        this.state.choose['total']=this.state.total
        this.state.total=0
        console.log(this.state.choose)
        userchoose.push(this.state.choose)
        this.state.choose=[]
        
        this.setState({isVisible:false,choose:this.state.choose,data:this.state.data,total:this.state.total})}
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
    button01:{
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
        backgroundColor:'#FF7F00'
        //paddingBottom:20
    }, button02:{
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
        backgroundColor:'#FF7F00'
        //paddingBottom:20
    }, button03:{
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
        backgroundColor:'#FF7F00'
        //paddingBottom:20
    }, button04:{
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
        backgroundColor:'#FF7F00'
        //paddingBottom:20
    }, button05:{
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
        backgroundColor:'#FF7F00'
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