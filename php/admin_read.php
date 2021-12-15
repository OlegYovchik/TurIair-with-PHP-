<?php
include "db.php";
$country = $_POST['country'];

$a = 'SELECT * FROM `tours` WHERE 1';
$b = "SELECT DISTINCT `Country` FROM `tours` WHERE 1";
$c = "SELECT DISTINCT `City` FROM `tours` WHERE `Country`='".$country."'";


function listCountryAll($link,$x){
    $tourQuery = mysqli_query($link,$x);
    $res = mysqli_fetch_all($tourQuery, MYSQLI_ASSOC);
    return json_encode($res);
};
if($_POST['sort'] == 'country'){
    echo listCountryAll($db,$b);
}else if($_POST['read'] == 'read'){
    echo listCountryAll($db,$a);
}else if($_POST['sort'] == 'city'){
    echo listCountryAll($db,$c);
};
?>