import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View,Button,Dimensions,ScrollView,FlatList,TouchableHighlight,Picker} from 'react-native'
import{getdatebaseurl,showdatabaseurl,listmealurl}from'../data/urls'
import {ListItem, Icon,Overlay}from 'react-native-elements'
import {unitWidth, width, height, unitHeight}from'../Pages/Adapt'
import {Overlayforcount}from'../components/overlayforhome'
import {storage}from'../data/storage'
export var userchoose=[]
console.log(height+" "+width)
export class HomeScreen extends Component{
    static navigationOptions = {tabBarLabel: 'Home',};
    constructor(props){
        super(props)
        this.state={isVisible:false,choose:[],
            total:0,initmeals:[],school:[],canteens:[],meals:[],selecteduniversity:'buct',selectedcanteen:'firstmeal'}
            console.log(getdatebaseurl,showdatabaseurl,listmealurl)
    } 
    componentDidMount(){
        fetch(getdatebaseurl)
                    .then(res=>res.json()) 
                    .then(data=> { 
                      console.log(data);   
                      this.setState({school:data})
                      fetch(listmealurl,{ 
                        method: 'post', 
                        headers: { 
                          "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
                        }, 
                        body: 'dbname=buct&dbtable=firstmeal'
                      })
                      .then(res=>res.json()) 
                      .then(data=> {   
                        this.state.meals=[]
          for(i in data){
              this.state.meals.push(data[i])
              this.state.meals[i]['num']=0
              this.state.meals[i]['id']=parseInt(i);
              this.state.meals[i]['price']=parseInt(this.state.meals[i]['price']);
          }
        this.setState({meals:this.state.meals})
                         console.log(this.state.meals)
                      }) 
                      .catch(function (error) { 
                        console.log('Request failed', error); 
                      }); 
                    }) 
                    .catch(function (error) { 
                      console.log('Request failed', error); 
                    });
          
    }
    changeschoolvalue=(itemValue, itemIndex) => {
      this.setState({selecteduniversity:itemValue})
     console.log(itemValue)
       fetch(showdatabaseurl,{ 
       method: 'post', 
       headers: { 
         "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
       }, 
       body: 'dbname='+itemValue
     })
     .then(res=>res.json()) 
     .then(data=> {   
       this.state.canteens=[]
       for(let i=1;i<=data[0];i++){
         this.state.canteens.push(data[i])
       } 
       this.setState({canteens:this.state.canteens})
       console.log(this.state.canteens)
     }) 
     .catch(function (error) { 
       console.log('Request failed', error); 
     }); }
     changemealvalue= (itemValue, itemIndex) => {
      console.log(this.state.selecteduniversity+' '+itemValue)
      this.setState({selectedcanteen:itemValue})
      fetch(listmealurl,{ 
        method: 'post', 
        headers: { 
          "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
        }, 
        body: 'dbname='+this.state.selecteduniversity.toString()+'&dbtable='+itemValue
      })
      .then(res=>res.json()) 
      .then(data=> {
          this.state.meals=[]
          for(i in data){
              this.state.meals.push(data[i])
              this.state.meals[i]['num']=0
              this.state.meals[i]['id']=parseInt(i);
              this.state.meals[i]['price']=parseInt(this.state.meals[i]['price']);
          }
        this.setState({meals:this.state.meals})
        console.log(this.state.meals)
      }) 
      .catch(function (error) { 
        console.log('Request failed', error); 
      }); 
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
    keyExtractor = (item, index) => index.toString()
    _renditem=({item}) =>
    <ListItem         
    title={item.name}
    bottomDivider true
    subtitle={
        <View style={{flexDirection:'row',justifyContent: 'space-around',}}>
        <Text >{"价格："+item.price}</Text>
        <View  style={{flexDirection:'row',justifyContent: 'center',}}>
        <TouchableHighlight style={style.button1}onPress={
            ()=>{ 
              //  console.log(this.state.meals[0])   
            this.state.meals[item.id].num++;
            this.state.total=this.state.total+item.price;
            console.log(this.state.total)
            this.setState({meals:this.state.meals,total:this.state.total});}}>
        <Icon name="add" />
        </TouchableHighlight>
        <View style={{width:50*unitWidth,height:50*unitWidth,borderWidth:1*unitWidth,textAlign:'center',
fontSize:20, alignItems:'center',
justifyContent:'center',}}>
          <Text >{item.num}</Text>
          </View>
          <TouchableHighlight style={style.button1}onPress={
               ()=>{
           this.state.meals[item.id].num--;console.log(this.state.meals[item.id])
           this.state.total=this.state.total-item.price
            console.log(this.state.total)
            this.setState({meals:this.state.meals,total:this.state.total})}}>
        <Icon name="remove" />
        </TouchableHighlight>
        </View>
        </View>
      }
    />
    add=()=>{
      for(let i=0;i<this.state.meals.length;i++){
          this.state.meals[i].num=0;
      }
      this.state.choose['time']=this.getmyDate()
      this.state.choose['total']=this.state.total
      this.state.total=0
      console.log(this.state.choose)
      userchoose.push(this.state.choose)
      this.state.choose=[]
      this.setState({isVisible:false,choose:this.state.choose,meals:this.state.meals,total:this.state.total})
      storage.save({
        key: 'loginState',
        data: {
            userchoose:userchoose
        },
        //expires为有效时间
        expires: 1000 * 3600
    })
    }
      remove=()=>{
        this.state.choose=[]
      this.setState({isVisible:false,choose:this.state.choose})}
    intent=()=>{
      for(let i=0;i<this.state.meals.length;i++){
          if(this.state.meals[i].num!=0){
              this.state.choose.push(this.state.meals[i])
          }
      }
      this.setState({isVisible:true,choose:this.state.choose})}
    render(){
        return(
            <View>
            <View>
            <Picker selectedValue={this.state.selecteduniversity}
                    style={{ height: 50, width: 360 }}
                    onValueChange={this.changeschoolvalue}>
                     {this.state.school.map((item1,i)=>(<Picker.Item label={item1.name} value={item1.engname}/>))}
            </Picker>  
            <View style={{borderWidth:1*unitWidth,marginBottom:1,marginTop:1}}></View>
            <Picker
                   selectedValue={this.state.selectedcanteen}
                  style={{ height: 50, width: 360 }}
                  onValueChange={this.changemealvalue}>
                  {this.state.canteens.map((item1,i)=>(<Picker.Item label={item1} value={item1}/>))}
          </Picker>
            </View>
            <View style={style.bottomborder}></View>
            <View style={{flexDirection:'row',height:1000*unitWidth}}>
             <View style={{width:100*unitWidth,marginBottom:100,justifyContent:'flex-end'}}>
                <View style={style.circle}>
                <TouchableHighlight onPress={this.intent}>
                <Icon name="shopping-cart" />
                </TouchableHighlight>
                </View>
            </View>
            <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.meals}
            extraData={this.state}
            renderItem={this._renditem}
            />
            <Overlayforcount
            isVisible={this.state.isVisible}choose={this.state.choose}
            add={this.add}
            remove={this.remove}
             total={this.state.total}/>
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
    alignItems:'center',
    justifyContent:'center',
    width: 40,
    height:40,
    borderWidth:1,
    borderColor:'black',
    borderStyle:'solid',
    borderRadius:90,
    paddingBottom:2    
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