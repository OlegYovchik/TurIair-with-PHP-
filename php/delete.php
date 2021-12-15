<?php
include_once "db.php";

    $country = $_POST['Country'];
    $city = $_POST['City'];
    $dateIn = $_POST['DateIn'];
    $days = $_POST['Days'];

    $sql = "DELETE FROM `tours` WHERE tours.Country='".$country."' AND tours.City='".$city."' AND tours.Date_in='".$dateIn."' AND tours.Days='".$days."'" ;
    
    mysqli_query($db,$sql);

?>