<?php
include_once 'db.php';

    if(isset($_POST['submit']))
    {
        $err = [];

        if(!preg_match("/^[a-zA-Z0-9]+$/",$_POST['login']))
        {
            $err[] = "Логін повинен бути тільки з букв англійського алфавіта та цифр";
        }

        if(strlen($_POST['login']) < 3 or strlen($_POST['login']) > 30)
        {
            $err[] = "Логін повинен бути неменше ніж з 3-х і небільше ніж з 30-ти букв";
        }

        $query = mysqli_query($db, "SELECT user_id FROM users WHERE user_login='".mysqli_real_escape_string($db, $_POST['login'])."'");
        if(mysqli_num_rows($query) > 0)
        {
            $err[] = "Користувач з таким логіном вже є в базі";
        }

        if(count($err) == 0)
        {

            $login = $_POST['login'];

            $password = md5(md5(trim($_POST['password'])));

            mysqli_query($db,"INSERT INTO users SET user_login='".$login."', user_password='".$password."'");
            exit();
        }
        else
        {
            print "<b>Під час реєстрації виникли такі помилки:</b><br>";
            foreach($err AS $error)
            {
                print $error."<br>";
            }
        }
    }
?>