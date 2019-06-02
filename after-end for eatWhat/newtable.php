<?php
//学校数据库内添加学校及代码，并创建学校的数据库，创建修改的学校数据库
header('content-type:application/x-www-form-urlencoded;charset=utf8');
$servername = "localhost";
$username = "root";
$PASSWORD = "";
$dbname = $_POST['dbname'];
$dbnameid=$_POST['dbnameid'];
$conn = new mysqli($servername, $username, $PASSWORD, $dbname);
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
    echo error;
} 
$sql = "CREATE TABLE $dbnameid(
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
name VARCHAR(30) NOT NULL,
price Double NOT NULL,
feature VARCHAR(30) NOT NULL,
score Double ,
scorepeople int
)";
if ($conn->query($sql) === TRUE) {
    echo 1;
} else {
    echo "创建数据表错误: " . $conn->error;
}
$conn->close();
?>