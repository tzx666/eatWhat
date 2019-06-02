<?php
//用户注册页面，检测是否为
header('content-type:application/x-www-form-urlencoded;charset=utf8');
$servername = "localhost";
$username = "root";
$PASSWORD = "";
$dbname = "users_eatwhat";
$name1=$_POST['name'];
$password1=$_POST['password'];
$email=$_POST['email'];
$flag=0;
$conn = new mysqli($servername, $username, $PASSWORD, $dbname);
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
$result = mysqli_query($conn,"SELECT * FROM users WHERE name='$name1'");
if($result==false)
echo var_dump($result);
while($row = mysqli_fetch_array($result))
{
    if($row['name']==$name1){
       $flag=1; echo 6; break;
    }else if($row['name']==$name1&&$password1!=$row['password']){
        $flag=1; echo 7;break;
    }
    else echo $flag;    
    }
    if($flag==0){
         $sql = "INSERT  INTO users (name,password,email)
            VALUES ('$name1', '$password1', '$email')";
        if ($conn->query($sql) === TRUE) {
            echo 1;
        } else {
            echo 0;
        } 
    }
   
$conn->close();
?>