<?php
//学校数据库内添加学校及代码，并创建学校的数据库，创建修改的学校数据库
header('content-type:application/x-www-form-urlencoded;charset=utf8');
$servername = "localhost";
$username = "root";
$PASSWORD = "";
$dbname = $_POST['dbname'];
$dbnameid=$_POST['dbnameid'];
$conn = new mysqli($servername, $username, $PASSWORD, 'universitys');
$flag=1;
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
    echo error;
} 
      $sql = "INSERT INTO universityname (name,engname) VALUES
      ('$dbname','$dbnameid')";
        if ($conn->query($sql) === TRUE) {
            $flag=1;
         //   echo 2;
        } else {
            $flag=0;
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
/*
*/
$conn->close();
if($flag==1){
  $conn = new mysqli($servername, $username, $PASSWORD);
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
// 创建数据库
$sql = "CREATE DATABASE $dbnameid";
if ($conn->query($sql) === TRUE) {
    $flag=2;
   // echo 3;
} else {
    $flag=-1;
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();  
}
if($flag==2){
    $conn = new mysqli($servername, $username, $PASSWORD,'onchangemeal');
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
$sql = "CREATE TABLE $dbnameid(
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
dbname VARCHAR(30) NOT NULL,
dbtable VARCHAR(30) NOT NULL,
name VARCHAR(30) NOT NULL,
price Double NOT NULL,
feature VARCHAR(50)
)";
 
if ($conn->query($sql) === TRUE) {
    echo 1;
} else {
    echo "创建数据表错误: " . $conn->error;
}
$conn->close();
}
?>