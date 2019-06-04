import React, {Component} from 'react'
import {userinfo}from'../UserScreen'
import{Userfeature,Superfeature,Warning}from'D:/eatWhat/components/componentsforuse.js'
export var datas=[]
export var superdatas=[]
export var superdatamealss=[]
export var initcanteenmeals=[]
export class MyInformationScreen extends Component{
    static navigationOptions = {
           header:null,
         };
         navigating=()=>this.props.navigation.navigate('requestpre')
         preforscore=()=>{ 
          fetch('http://qt8kjn.natappfree.cc/app-contact/getdatebase.php')
      .then(res=>res.json()) 
      .then(data=> {  
        datas=data
        fetch('http://qt8kjn.natappfree.cc/app-contact/listmeal.php',{ 
method: 'post', 
headers: { 
"Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
}, 
body: 'dbname=buct&dbtable=firstmeal'
})
.then(res=>res.json()) 
.then(data=> {   
initcanteenmeals=data
console.log(initcanteenmeals)
this.props.navigation.navigate('scoreformeal')
}) 
.catch(function (error) { 
console.log('Request failed', error); 
});  
      }) 
      .catch(function (error) { 
        console.log('Request failed', error); 
      });                   
    }
    preforchangemeal=()=>
    {   fetch('http://qt8kjn.natappfree.cc/app-contact/getdatebase.php')
    .then(res=>res.json()) 
    .then(data=> { 
      console.log(data);   
      datas=data
      fetch('http://qt8kjn.natappfree.cc/app-contact/listmeal.php',{ 
        method: 'post', 
        headers: { 
          "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
        }, 
        body: 'dbname=buct&dbtable=firstmeal'
      })
      .then(res=>res.json()) 
      .then(data=> {   
       initcanteenmeals=data
         console.log(datas+initcanteenmeals)
       this.props.navigation.navigate('changemeals')
      }) 
      .catch(function (error) { 
        console.log('Request failed', error); 
      }); 
    }) 
    .catch(function (error) { 
      console.log('Request failed', error); 
    }); 
       }
       preforcanteen=()=>{
         console.log(userinfo.universityid)
        fetch('http://qt8kjn.natappfree.cc/app-contact/showdatabase.php',{ 
            method: 'post', 
            headers: { 
              "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
            }, 
            body: 'dbname='+userinfo.universityid
          })
          .then(res=>res.json()) 
          .then(data=> {   
            superdatas=[]
            if(data==0){
              superdatamealss=[{name:'当前暂无菜品，请先添加'}]
              this.props.navigation.navigate('deal1')
            }else{
              for(let i=1;i<=data[0];i++){
              superdatas.push(data[i])
            }
             fetch('http://qt8kjn.natappfree.cc/app-contact/listmeal.php',{ 
                method: 'post', 
                headers: { 
                  "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
                }, 
                body: 'dbname='+userinfo.universityid+'&dbtable='+superdatas[0].toString()
              })
              .then(res=>res.json()) 
              .then(data=> {
                  if(data!=-2)   
                superdatamealss=data;
                else
                superdatamealss=[{name:'当前暂无菜品，请先添加'}]
                console.log(superdatamealss) 
                this.props.navigation.navigate('deal1')
              }) 
              .catch(function (error) { 
                console.log('Request failed', error); 
              }); 
            console.log(superdatas)
            }
          }) 
          .catch(function (error) { 
            console.log('Request failed', error); 
          }); 
       }
       navigating1=()=>this.props.navigation.navigate('deal2')
    render(){
        console.log(userinfo)
        if(userinfo.permission==-1)
        return(<Warning/>)
        else if(userinfo.permission==1){
          return(
           <Userfeature navigating={this.navigating}preforscore={this.preforscore}preforchangemeal={this.preforchangemeal}/>
        ) 
       
        } else {
            return(<Superfeature preforcanteen={this.preforcanteen} navigating1={this.navigating1}name={userinfo.name}/>)
        }
    }
}