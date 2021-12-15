<?php
include_once "db.php";

    $codeOld = $_POST['CodeOld'];
    $countryOld = $_POST['CountryOld'];
    $cityOld = $_POST['CityOld'];
    $dateInOld = $_POST['DateInOld'];
    $daysOld = $_POST['DaysOld'];
    $codeNew = $_POST['CodeNew'];
    $countryNew = $_POST['CountryNew'];
    $cityNew = $_POST['CityNew'];
    $dateInNew = $_POST['DateInNew'];
    $daysNew = $_POST['DaysNew'];

    $sql = "UPDATE `tours` SET `code`='".$codeNew."',`Country`='".$countryNew."',`City`='".$cityNew."',`Date_in`='".$dateInNew."',`Days`='".$daysNew."' WHERE `code`='".$codeOld."' AND `Country`='".$countryOld."' AND `City`='".$cityOld."' AND `Date_in`='".$dateInOld."' AND `Days`='".$daysOld."'";
    echo $sql;
    echo mysqli_query($db,$sql);

?>