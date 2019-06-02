<?php
//列举查询的表单菜单
//如果查询到，返回菜品名称价格
//如果查询不到这个大学存在，返回-3
//查询不到这个食堂返回-2
header('content-type:application/json;charset=utf8');
$servername = "localhost";
$username = "root";
$PASSWORD = "";
$dbname =$_POST['dbname'];
$name=$_POST['dbtable'];
$conn = new mysqli($servername, $username, $PASSWORD, $dbname);
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
    echo json_encode(-3);
} 
$sql = "SELECT name, price, feature,score,scorepeople FROM $name";
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