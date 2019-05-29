
var url='http://localhost/app-contact/test0.php'
var url1='http://localhost/app-contact/loginsearch.php'
var url2='http://localhost/app-contact/addmeal1.php'
var firstcanteenmeal=[{
  id:1,name:"凉菜/两",price:1.6,feature:'2',num:0,score:6
},{
  id:2,name:"鸡腿饭",price:10,feature:'2',num:0,score:6
},{
  id:3,name:"鸭肉饭",price:10,feature:'2',num:0,score:6
},{
  id:4,name:'排骨饭',price:13,feature:'2',num:0,score:6
},{
  id:5,name:'牛肉饭',price:15,feature:'2',num:0,score:6
},{
  id:6,name:'红烧肉',price:5,feature:'2',num:0,score:6
},{
  id:7,name:'8元盖饭（两菜/单点4元）',price:8,feature:'2',num:0,score:6
},{
  id:8,name:'自选（待更新）',price:4.5,feature:'2',num:0,score:6
},{
  id:9,name:'大碗米饭',price:1,feature:'2',num:0,score:6
},{
  id:10,name:'小碗米饭',price:0.5,feature:'2',num:0,score:6
},{
  id:11,name:'蛋花汤',price:1,feature:'2',num:0,score:6
},{
  id:12,name:'南瓜粥',price:1,feature:'2',num:0,score:6
},{
  id:13,name:'紫薯粥',price:1,feature:'2',num:0,score:6
},{
  id:14,name:'酒酿粥',price:1,feature:'2',num:0,score:6
},{
  id:15,name:'小米粥',price:1,feature:'2',num:0,score:6
},{
  id:16,name:'蔬菜粥',price:1,feature:'2',num:0,score:6
},{
  id:17,name:'荷叶粥',price:1.5,feature:'2',num:0,score:6
},{
  id:18,name:'桂花莲子粥',price:2,feature:'2',num:0,score:6
},{
  id:19,name:'皮蛋瘦肉粥',price:2,feature:'2',num:0,score:6
},{
  id:20,name:'汤/粥/奶加糖',price:0.4,feature:'2',num:0,score:6
},{
  id:21,name:'鸡块/西红柿面',price:5,feature:'2',num:0,score:6
},{
  id:22,name:'麻团',price:1,feature:'2',num:0,score:6
},{
  id:23,name:'饺子',price:12,feature:'2',num:0,score:6
},{
  id:24,name:'包子素',price:1,feature:'2',num:0,score:6
},{
  id:25,name:'肉包子',price:2,feature:'2',num:0,score:6
},{
  id:26,name:'糯米烧卖',price:2,feature:'2',num:0,score:6
},{
  id:27,name:'土豆饼',price:2.5,feature:'2',num:0,score:6
},{
  id:28,name:'肉饼',price:3,feature:'2',num:0,score:6
},{
  id:29,name:'炒饭（小）',price:3,feature:'2',num:0,score:6
},{
  id:29,name:'炒饭（大）',price:6,feature:'2',num:0,score:6
},{
  id:30,name:'蒜蓉油麦菜',price:5,feature:'2',num:0,score:6
},{
  id:31,name:'菠菜木耳',price:2.5,feature:'2',num:0,score:6
},{
  id:32,name:'白菜木耳',price:1.5,feature:'2',num:0,score:6
},{
  id:33,name:'凤梨凉瓜',price:5,feature:'2',num:0,score:6
},{
  id:34,name:'南瓜炒秋耳',price:2.5,feature:'2',num:0,score:6
},{
  id:35,name:'三彩藕片',price:3.5,feature:'2',num:0,score:6
},{
  id:36,name:'清炒小油菜',price:3,feature:'2',num:0,score:6
},{
  id:37,name:'清汤佛手瓜',price:2.5,feature:'2',num:0,score:6
},{
  id:38,name:'泉水胡萝卜',price:1.5,feature:'2',num:0,score:6
},{
  id:39,name:'素炒娃娃菜',price:3.5,feature:'2',num:0,score:6
},{
  id:40,name:'清炒芦笋',price:2.5,feature:'2',num:0,score:6
},{
  id:41,name:'手撕包菜',price:1.5,feature:'2',num:0,score:6
},{
  id:42,name:'蒜蓉西兰花',price:4,feature:'2',num:0,score:6
},{
  id:43,name:'清炒菜心',price:3.5,feature:'2',num:0,score:6
},{
  id:44,name:'素炒黄心菜',price:3,feature:'2',num:0,score:6
},{
  id:45,name:'醋溜白菜',price:1.2,feature:'2',num:0,score:6
},{
  id:46,name:'醋溜豆芽',price:1.5,feature:'2',num:0,score:6
},{
  id:47,name:'酸溜土豆丝',price:2.5,feature:'2',num:0,score:6
},{
  id:48,name:'炝炒圆白菜',price:3,feature:'2',num:0,score:6
},{
  id:49,name:'尖椒土豆丝',price:3.5,feature:'2',num:0,score:6
},{
  id:50,name:'西红柿鸡蛋',price:4.5,feature:'2',num:0,score:6
},{
  id:51,name:'木须肉',price:6,feature:'2',num:0,score:6
},{
  id:52,name:'尖椒豆皮',price:6,feature:'2',num:0,score:6
},{
  id:53,name:'香辣鱼豆腐',price:6,feature:'2',num:0,score:6
},{
  id:54,name:'鸡排',price:3,feature:'2',num:0,score:6
},{
  id:55,name:'鸡腿',price:4,feature:'2',num:0,score:6
},


{
  id:56,name:'圆白菜粉条',price:1.5,feature:'2',num:0,score:6
},{
  id:57,name:'油菜烧豆腐',price:2.5,feature:'2',num:0,score:6
},{
  id:58,name:'冬瓜木耳',price:2.5,feature:'2',num:0,score:6
},{
  id:59,name:'木耳西葫芦',price:3,feature:'2',num:0,score:6
},{
  id:60,name:'香干油菜',price:4,feature:'2',num:0,score:6
},{
  id:61,name:'玉米粒',price:5.5,feature:'2',num:0,score:6
},{
  id:62,name:'烧茄子',price:6,feature:'2',num:0,score:6
},{
  id:63,name:'鲜蘑菇肠丁',price:6,feature:'2',num:0,score:6
},{
  id:64,name:'鸡蛋羹',price:6,feature:'2',num:0,score:6
},{
  id:65,name:'狮子头',price:2,feature:'2',num:0,score:6
}
]
 const fetch=require('node-fetch')
function searchlogin(){
    fetch(url1, { 
    method: 'post', 
    headers: { 
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
    }, 
    body: 'name='+name1
  })
  .then(res=>res.json()) 
  .then(function (data) { 
    console.log('Request succeeded with JSON response', data); 
  }) 
  .catch(function (error) { 
    console.log('Request failed', error); 
  }); 
}
function login(id,name,price,feature,score){
    fetch(url2, { 
    method: 'post', 
    headers: { 
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
    }, 
    body: 'id='+id+'&name='+name+'&price='+price+'&feature='+feature
  })
  .then(res=>res.text()) 
  .then(function (data) { 
    console.log(data); 
  }) 
  .catch(function (error) { 
    console.log('Request failed', error); 
  }); 
}
for(let i=1;i<=65;i++){
console.log(firstcanteenmeal[i]['name']);
login(firstcanteenmeal[i]['id'],firstcanteenmeal[i]['name'],firstcanteenmeal[i]['price'],firstcanteenmeal[i]['feature'])
}

//fetch(url).then(res=>res.json()).then(data=>console.log(data))