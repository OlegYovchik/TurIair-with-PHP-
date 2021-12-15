<?php

$db=mysqli_connect('localhost','root','','turiair');
if(mysqli_connect_errno()){
    echo 'Error in connection! '.mysqli_connect_error();
    exit();
};
?>