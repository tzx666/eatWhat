
var url='http://localhost/app-contact/test0.php'
var url1='http://localhost/app-contact/loginsearch.php'
var url2='http://localhost/app-contact/addmeal.php'
var url3='http://localhost/app-contact/listmeal.php'
var url4='http://localhost/app-contact/showdatabase.php'
var url5='http://192.168.43.40/app-contact/getdatebase.php'
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
function login(){
    fetch(url3, { 
    method: 'post', 
    headers: { 
      "Content-type": "application/x-www-form-urlencoded;" 
    }, 
    body: 'dbname=buct&dbtable=firstmeal'
  })
  .then(res=>res.json()) 
  .then(function (data) { 
    console.log(data); 
  }) 
  .catch(function (error) { 
    console.log('Request failed', error); 
  }); 
}
function addmeal(){
  fetch(url2, { 
  method: 'post', 
  headers: { 
    "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
  }, 
  body: 'university=buct&canteenname=firstmeal&name=zhong碗宽面&price=10&feature=全体供应'
})
.then(res=>res.text()) 
.then(function (data) { 
  console.log(data); 
}) 
.catch(function (error) { 
  console.log('Request failed', error); 
}); 
}
//login()
function gettablename(){
  fetch(url5)
.then(res=>res.json()) 
.then(function (data) { 
  console.log(data); 
}) 
.catch(function (error) { 
  console.log('Request failed', error); 
}); 
}
let namse='buct'
function tablename(){
  fetch(url4, { 
  method: 'post', 
  headers: { 
    "Content-type": "application/x-www-form-urlencoded;charset=utf8'" 
  }, 
  body: 'dbname='+namse
})
.then(res=>res.json()) 
.then(function (data) { 
  console.log(data); 
}) 
.catch(function (error) { 
  console.log('Request failed', error); 
}); 
}
login()


//fetch(url).then(res=>res.json()).then(data=>console.log(data))