$('#auth').on('submit',function(e){
    e.preventDefault();
    $login = $('#login').val();
    $pass = $('#pass').val();
    $ip = $('input[name="not_attach_ip"]').val();
    $req = {login:$login, password:$pass, not_attach_ip:$ip, submit:true};
    $cont = 0;
    $.post("/turiair/php/login.php", $req)
    .done(function(data){
        $('.error').text(data);
        if(data=='Привіт. Все працює!'){
            $('#auth').hide();
            $('#addForm').show();
            edit();
            $('header').append('<button id="link7">۩</button>');
        }else{
            return;
        };
    });
});
$('#regClick').click(function(){
    $('#auth').hide();
    $('#page6').append("<form id='reg' method='POST'><fieldset><legend>Реєстрація нового користувача</legend>Логін<input name='login' type='text' required><br>Пароль<input name='password' type='password' required><br><input name='submit' type='submit' value='Зареєструватись'><input name='return' type='button' value='Повернутись'></fieldset></form>");
    $('input[name="return"]').click(function(){
        $('#reg').hide();
        $('#auth').show();
    });
    $('#reg').on('submit',function(e){
        e.preventDefault();
        if($('#reg p')){
            $('#reg p').remove();
        }
        $login = $('#reg input[name="login"]').val();
        $password = $('#reg input[name="password"]').val();

        $.post('/turiair/php/register.php',{login: $login, password: $password, submit:true})
        .done(function(data){
            console.log(data);
            if(data==""){
                $('#reg').hide();
                $('#auth').show();
            }else{
                $('#reg').append('<p>'+data+'</p>');
            }
        });
    })
});
$('#cancel').on('click', function(){
    $('#page6').fadeOut('slow');
    $('#page1').fadeIn('slow').css('display','flex');
    $('#link6').show();
    $('#link1').hide();
});
$('#addForm').on('submit',function(e){
    e.preventDefault();
    $addCode = $('#addCode').val();
    $addCountry = $('#addCountry').val();
    $addCity = $('#addCity').val();
    $addDate = $('#addDate').val();
    $addDays = $('#addDays').val();
    $.post("/turiair/php/add.php",{'Code':$addCode,'Country':$addCountry, 'City':$addCity, 'DateIn':$addDate, 'Days':$addDays})
    .done(function(data){
        console.log(data);
        $('#table1').append(
            '<tr id="tr'+($cont+1)+'"><td name="code"><div contenteditable>'+$addCode+'</div></td><td name="country"><div contenteditable>'+$addCountry+'</div></td><td name="city"><div contenteditable>'+$addCity+'</div></td><td name="dateIn"><div contenteditable>'+$addDate+'</div></td><td name="days"><div contenteditable>'+$addDays+'</div></td><td></td></tr>'
            );
        $cont++;
    });
    edit();
});
var edit = function(){
    if($('#table1')){
        $('#table1').remove();
    };
    $.post("/turiair/php/admin_read.php",{'read':"read"},
        function (data){    
            $res = JSON.parse(data);
            $cont=$res.length;
            $('#page6').prepend(
                '<table border="1" id="table1"><caption>Таблица туров</caption><tr><th>Code</th><th>Country</th><th>City</th><th>Date_in</th><th>Days</th><th>Editing</th></tr></table>'
            );
            for($i=0;$i<$res.length;$i++){
                $('#table1').append(
                '<tr id="tr'+($i+1)+'"><td name="code"><div contenteditable>'+$res[$i].code+'</div></td><td name="country"><div contenteditable>'+$res[$i].Country+'</div></td><td name="city"><div contenteditable>'+$res[$i].City+'</div></td><td name="dateIn"><div contenteditable>'+$res[$i].Date_in+'</div></td><td name="days"><div contenteditable>'+$res[$i].Days+'</div></td><td><button id="edit'+($i+1)+'">Edit</button><button id="delete'+($i+1)+'">Delete</button></td></tr>'
                );
            };
            $("button[id^='delete']").click(function() {
                $id=this.id.replace('delete','');
                $country = $('tr[id=tr'+$id+'] td[name=country] div')[0].textContent;
                $city = $('tr[id=tr'+$id+'] td[name=city] div')[0].textContent;
                $dateIn = $('tr[id=tr'+$id+'] td[name=dateIn] div')[0].textContent;
                $days = $('tr[id=tr'+$id+'] td[name=days] div')[0].textContent;
                $infoTable = {'Country':$country, 'City':$city, 'DateIn':$dateIn, 'Days':$days};
                $trTable =  $('tr[id=tr'+$id+']');
                $trTable.remove();
                $.post("/turiair/php/delete.php",$infoTable)
            });
            $("tr[id^='tr']").click(function() {
                $id=this.id.replace('tr','');
                //----------------Style-------------------------------
                $('tr[id^="tr"]').css('background-color','rgba(19, 18, 18, 0.01)').css('color','black');
                $('button[id^="edit"]').css('background-color','rgba(29, 28, 28, 0.75)').css('color','white');
                $('tr[id="tr'+$id+'"]').css('background-color','rgba(19, 18, 18, 0.75)').css('color','white');
                $('button[id="edit'+$id+'"]').css('background-color','rgba(124, 5, 5, 0.75)').css('color','white');

                //----------------Text trOld table------------------------
                var queryCode = $('tr[id=tr'+$id+'] td[name=code] div')[0].textContent;
                var queryCountry = $('tr[id=tr'+$id+'] td[name=country] div')[0].textContent;
                var queryCity = $('tr[id=tr'+$id+'] td[name=city] div')[0].textContent;
                var queryDateIn = $('tr[id=tr'+$id+'] td[name=dateIn] div')[0].textContent;
                var queryDays = $('tr[id=tr'+$id+'] td[name=days] div')[0].textContent;
                //----------------Button click------------------------
                $('button[id="edit'+$id+'"]').on('click',function(){
                    var queryCodeNew = $('tr[id=tr'+$id+'] td[name=code] div')[0].textContent;
                    var queryCountryNew = $('tr[id=tr'+$id+'] td[name=country] div')[0].textContent;
                    var queryCityNew = $('tr[id=tr'+$id+'] td[name=city] div')[0].textContent;
                    var queryDateInNew = $('tr[id=tr'+$id+'] td[name=dateIn] div')[0].textContent;
                    var queryDaysNew = $('tr[id=tr'+$id+'] td[name=days] div')[0].textContent;
                    if(queryCode==queryCodeNew){var codeEdit=queryCode}else{codeEdit=queryCodeNew};
                    if(queryCountry==queryCountryNew){var countryEdit=queryCountry}else{countryEdit=queryCountryNew};
                    if(queryCity==queryCityNew){var cityEdit=queryCity}else{cityEdit=queryCityNew};
                    if(queryDateIn==queryDateInNew){var dateInEdit=queryDateIn}else{dateInEdit=queryDateInNew};
                    if(queryDays==queryDaysNew){var daysEdit=queryDays}else{daysEdit=queryDaysNew};

                    $infoTableEdit = {'CodeOld':queryCode,'CountryOld':queryCountry, 'CityOld':queryCity, 'DateInOld':queryDateIn, 'DaysOld':queryDays, 'CodeNew':codeEdit,'CountryNew':countryEdit, 'CityNew':cityEdit, 'DateInNew':dateInEdit, 'DaysNew':daysEdit};
                    $.post("/turiair/php/edit.php",$infoTableEdit);
                });
            });
        }
    );
};