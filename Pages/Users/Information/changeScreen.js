import React, {Component} from 'react'
import { StyleSheet, Text, View,Picker,TextInput,Alert} from 'react-native'
import {superdatas}from './MyInformationScreen'
import {superdatamealss}from './MyInformationScreen'
import { ListItem,Overlay,CheckBox,Button  } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {userinfo}from '../UserScreen'
export class changeScreen extends Component{
    //首先根据管理员所在学校查询表的数量，并列举，然后添加/删除新的食堂
    static navigationOptions = {
        header:null,
      };
      constructor(prpos){
          //1模式是修改菜品，2模式修改食堂，3模式新增菜单
          super(prpos)
          this.state={feature:['早餐','午餐','午晚餐','晚餐','全天供应'],universityname:userinfo.universityid
          ,universitycanteens:superdatas,
          canteenmeals:superdatamealss
           ,selectedcanteen:superdatas[0],isVisible:false,onchangmeal:'',onchagmealprice:0,onchagmealfeature:''
           ,changemode:1,mode:1,name:'',price:'',feature1:'',onaddcanteen:superdatas[0],onchangecanteen:''}
      }
      selectedCan=(itemValue, itemIndex) => {
        console.log(this.state.selecteduniversity+' '+itemValue)
        this.setState({selectedcanteen:itemValue})
        fetch('http://192.168.43.40/app-contact/listmeal.php',{ 
          method: 'post', 
          headers: { 
            "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
          }, 
          body: 'dbname='+this.state.universityname.toString()+'&dbtable='+itemValue
        })
        .then(res=>res.json()) 
        .then(data=> {  
            if(data!=-2){
                this.state.canteenmeals=data
          this.setState({canteenmeals:this.state.canteenmeals})
          console.log(this.state.canteenmeals)
            } else{
                superdatamealss=[{name:'当前暂无菜品，请先添加'}]
            }
          
        }) 
        .catch(function (error) { 
          console.log('Request failed', error); 
        }); 
        }
    render(){
        return(
            <View>
                 <ScrollView>
              <Picker
  selectedValue={this.state.selectedcanteen}
  style={{ height: 50, width: 360 }}
  onValueChange={this.selectedCan}>
      {
          this.state.universitycanteens.map((item1,i)=>(
               <Picker.Item label={item1} value={item1} />
          ))
      }
              </Picker>
              <Button type='outline' title="新增食堂" onPress={()=>{
                  this.setState({changemode:2,isVisible:true})
              }}/>
               
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
                <Button type='outline' title="新增菜品"onPress={()=>{
                  this.setState({changemode:2,isVisible:true})}}/>
                </ScrollView>

                <Overlay isVisible={this.state.isVisible} fullScreen='true'>
                   {
                       this.state.changemode==1?<View><Text>你将要修改：{this.state.onchangmeal}</Text>
            <TextInput autoFocus='true' style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder='name'
        onChangeText={(onchangmeal) => this.setState({onchangmeal})}
        value={this.state.name}/>
        <TextInput autoFocus='true' style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder='price'
        onChangeText={(onchagmealprice) => this.setState({onchagmealprice})}
        value={this.state.price}/>
 <Picker
  selectedValue={this.state.onchagmealfeature}
  style={{ height: 50, width: 360 }}
  onValueChange={(itemValue, itemIndex) => {
    console.log(this.state.selecteduniversity+' '+itemValue)
    this.setState({onchagmealfeature:itemValue})
    }}>
      {
          this.state.feature.map((item1,i)=>(
               <Picker.Item label={item1} value={item1} />
          ))
      }
              </Picker>
            <Button type='outline'title="submit" buttonStyle={{marginBottom:10}}onPress={()=>{
              console.log('dbname='+this.state.selecteduniversity.toString()+'&dbtable='
              +this.state.selectedcanteen.toString()+'&name='+this.state.onchangmeal.toString()
              +'&price='+this.state.onchagmealprice+'&feature='+this.state.onchagmealfeature.toString())
              fetch('http://192.168.43.40/app-contact/addmeal.php',{ 
                method: 'post', 
                headers: { 
                  "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
                }, 
                body: 'dbname='+this.state.selecteduniversity.toString()+'&dbtable='
                +this.state.selectedcanteen.toString()+'&name='+this.state.onchangmeal.toString()
                +'&price='+this.state.onchagmealprice+'&feature='+this.state.onchagmealfeature.toString()
              })
              .then(res=>res.text()) 
              .then(data=> {   
                console.log(data)
                if(data==1){
                  Alert.alert("上传成功")
                this.setState({isVisible:false})}
                else
                Alert.alert(data)
              }) 
              .catch(function (error) { 
                console.log('Request failed', error); 
              }); 
            }}/>
            <Button type='outline'title="back"onPress={()=>{this.setState({isVisible:false})}}/></View>:
            <View>
                <Picker  selectedValue={this.state.mode}
  style={{ height: 50, width: 360 }}
  onValueChange={(itemValue, itemIndex) => {
    console.log(this.state.selecteduniversity+' '+itemValue)
    this.setState({mode:itemValue})
    }}>
                    <Picker.Item label={"新增菜品"} value={1}/>
                    <Picker.Item label={"新增食堂"} value={2}/>
                </Picker>
                {
                    this.state.mode==1?
                    <View>
                        <TextInput autoFocus='true' style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder='name'
        onChangeText={(name) => this.setState({name})}
        value={this.state.name}/>
        <TextInput autoFocus='true' style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder='price'
        onChangeText={(price) => this.setState({price})}
        value={this.state.price}/>
 <Picker
  selectedValue={this.state.onchagmealfeature}
  style={{ height: 50, width: 360 }}
  onValueChange={(itemValue, itemIndex) => {
    console.log(this.state.selecteduniversity+' '+itemValue)
    this.setState({onchagmealfeature:itemValue})
    }}>
      {
          this.state.feature.map((item1,i)=>(
               <Picker.Item label={item1} value={item1} />
          ))
      }
              </Picker>
              <Picker
  selectedValue={this.state.onaddcanteen}
  style={{ height: 50, width: 360 }}
  onValueChange={(itemValue, itemIndex) => {
    console.log(this.state.selecteduniversity+' '+itemValue)
    this.setState({onaddcanteen:itemValue})
    }}>
      {
          this.state.universitycanteens.map((item1,i)=>(
               <Picker.Item label={item1} value={item1} />
          ))
      }
              </Picker>
              <Button type='outline'title="submit" onPress={()=>{
              console.log('dbname='+this.state.universityname.toString()+'&dbtable='
              +this.state.onaddcanteen.toString()+'&name='+this.state.name.toString()
              +'&price='+this.state.price+'&feature='+this.state.onchagmealfeature.toString())
              fetch('http://192.168.43.40/app-contact/addmeal.php',{ 
                method: 'post', 
                headers: { 
                  "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
                }, 
                body: 'dbname='+this.state.universityname.toString()+'&dbtable='
                +this.state.onaddcanteen.toString()+'&name='+this.state.name.toString()
                +'&price='+this.state.price+'&feature='+this.state.onchagmealfeature.toString()
              })
              .then(res=>res.text()) 
              .then(data=> {   
                console.log(data)
                if(data==1){
                  Alert.alert("上传成功")
                  let conbile={name:this.state.name,price:this.state.price,feature:this.state.onchagmealfeature,score:0,scorepeople:0}
                  this.state.canteenmeals.push(conbile)
                this.setState({isVisible:false,canteenmeals:this.state.canteenmeals})}
                else
                Alert.alert(data)
              }) 
              .catch(function (error) { 
                console.log('Request failed', error); 
              }); 
            }}/>
            <Button type='outline'title="back"onPress={()=>{this.setState({isVisible:false})}}/>
                    </View>
                         :
                         <View>
                             <TextInput autoFocus='true' style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder='请输入食堂名称'
        onChangeText={(onchangecanteen) => this.setState({onchangecanteen})}
        value={this.state.onchangecanteen}/>
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <Button title="submit" buttonStyle={{marginBottom:10}} onPress={()=>{
             console.log(this.state.universityname+this.state.onchangecanteen)
              fetch('http://192.168.43.40/app-contact/newtable.php',{ 
                method: 'post', 
                headers: { 
                  "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
                }, 
                body: 'dbname='+this.state.universityname.toString()+'&dbnameid='+this.state.onchangecanteen
              })
              .then(res=>res.text()) 
              .then(data=> {   
                console.log(data)
                if(data==1){
                  Alert.alert("添加成功")
                  this.state.universitycanteens.push(this.state.onchangecanteen)
                this.setState({isVisible:false,onchangecanteen:'',universitycanteens:this.state.universitycanteens})}
                else
                Alert.alert(data)
              }) 
              .catch(function (error) { 
                console.log('Request failed', error); 
              }); 
            }}/>
            <Button title="back"onPress={()=>{this.setState({isVisible:false})}}/>
            </View>
                        </View>
                }
            </View>
                   }
          </Overlay>
            </View>
        )
    }
}