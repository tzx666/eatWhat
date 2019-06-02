<?php
//用户注册页面，检测是否为
header('content-type:application/x-www-form-urlencoded;charset=utf8');
$servername = "localhost";
$username = "root";
$PASSWORD = "";
$dbname = "users_eatwhat";
$name1=$_POST['name'];
$password1=$_POST['password'];
$universityname=$_POST['universityname'];
$university=$_POST['university'];
$flag=0;
$conn = new mysqli($servername, $username, $PASSWORD, $dbname);
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
    $sql = "INSERT  INTO superusers (name,password,universityname,university)
    VALUES ('$name1', '$password1','$universityname','$university')";
if ($conn->query($sql) === TRUE) {
    echo 1;
} else {
    echo 0;
} 
$conn->close();
?>