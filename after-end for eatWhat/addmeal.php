<?php
//检测数据库内是否存在该条记录，如果存在取消插入，存在则不插入
header('content-type:application/x-www-form-urlencoded;charset=utf8');
$servername = "localhost";
$username = "root";
$PASSWORD = "";
$dbname = $_POST['dbname'];
$dbtable=$_POST['dbtable'];
$name=$_POST['name'];
$price=(double)$_POST['price'];
$feature=$_POST['feature'];
$conn = new mysqli($servername, $username, $PASSWORD, $dbname);
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
    echo error;
} 
      $sql = "INSERT INTO $dbtable (name,price,feature) VALUES
      ('$name', $price, '$feature')
  ON DUPLICATE KEY UPDATE name='$name',price=$price,feature='$feature'";
        if ($conn->query($sql) === TRUE) {
            echo 1;
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
/*
*/
$conn->close();
?>