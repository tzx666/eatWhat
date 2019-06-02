<?php
//接收app的查询请求并返回结果
//默认接收的是用户名密码，如果用户密码均正确返回1，用户存在密码错误返回0，用户不存在返回-1
header('content-type:application/json;charset=utf8');
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "users_eatwhat";
$name=$_POST['name'];
$password1=$_POST['password'];
$conn = new mysqli($servername, $username, $password, $dbname);
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
$sql = "SELECT * FROM users WHERE name='$name'";
$result = $conn->query($sql);
if($result==false){
    var_dump($result);
}
else if ($result->num_rows > 0) {
    // 输出数据
    while($row = $result->fetch_assoc()) {
        if($row['password']==$password1){
            echo 1;
        }
        
        else
        echo 0;
        }
} else {
    echo -1;
}
$conn->close();
?>