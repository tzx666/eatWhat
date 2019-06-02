<?php
//列举所有大学
header('content-type:application/json;charset=utf8');
$servername = "localhost";
$username = "root";
$PASSWORD = "";
$dbname ="universitys";
$conn = new mysqli($servername, $username, $PASSWORD, $dbname);
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
    echo json_encode(-3);
} 
$sql = "SELECT name, engname FROM universityname";
$result = $conn->query($sql);
$list=array();
if ($result->num_rows > 0) {
    // 输出数据
    while($row = $result->fetch_assoc()) {
       array_push($list,$row);
    }
    echo json_encode($list);
} else {
    echo json_encode(-2);
}

$conn->close();
?>