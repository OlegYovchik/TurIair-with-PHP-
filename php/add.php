<?php
include_once 'db.php';

$code = $_POST['Code'];
$country = $_POST['Country'];
$city = $_POST['City'];
$dateIn = $_POST['DateIn'];
$days = $_POST['Days'];

$sql = "INSERT INTO `tours`(`Code`,`Country`, `City`, `Date_in`, `Days`) VALUES ('".$code."','".$country."','".$city."','".$dateIn."','".$days."')" ;

$res = mysqli_query($db,$sql);

echo json_decode($res);

?>