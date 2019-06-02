<?php
header('content-type:application/x-www-form-urlencoded;charset=utf8');
$servername = "localhost";
$username = "root";
$PASSWORD = "";
$dbname = "onchangemeal";
$dbtable=$_POST['dbtable'];
$name=$_POST['name'];
$con=mysqli_connect("localhost",$username,$PASSWORD,$dbname);
// 检测连接
if (mysqli_connect_errno())
{
    echo "连接失败: " . mysqli_connect_error();
}
$sql=mysqli_query($con,"DELETE FROM $dbtable WHERE name='$name'");
echo 1;
mysqli_close($con);
?>