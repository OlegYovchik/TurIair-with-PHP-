<?php
include_once 'db.php';

$postdata = \json_decode(file_get_contents('php://input'), true);
    $country = $postdata['Country'];
    $city = $postdata['City'];
    $days = $postdata['Days'];

$sql = "SELECT * FROM `tours` WHERE tours.Country='".$country."' AND tours.City='".$city."'" ;
$sql1 = "SELECT * FROM `tours` WHERE tours.Country='".$country."' AND tours.City='".$city."' AND tours.Days='".$days."'";


function listCountry($link,$x){
    $tourQuery = mysqli_query($link,$x);
    $res = mysqli_fetch_all($tourQuery, MYSQLI_ASSOC);
    return json_encode($res);
};
if($days!=""){
    echo listCountry($db,$sql1);
}else{
    echo listCountry($db,$sql);
}

?>