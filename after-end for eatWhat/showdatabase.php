<?php
$server = 'localhost'; 
$user = 'root';
$pass = ''; 
$dbname =$_POST['dbname'];
$conn = new mysqli($server,$user,$pass,$dbname);
if(!$conn) die("数据库系统连接失败！");
$sql="show tables from $dbname";
$result = $conn->query($sql);
$list=array();
if ($result->num_rows > 0) {
    // 输出数据
    array_push($list,$result->num_rows);
    while($row = $result->fetch_assoc()) {
       array_push($list,$row['Tables_in_'.$dbname]);
    }
    echo json_encode($list);
} else {
    echo 0;
}
?>