var countries = [];
$('#link2').on('click',function(){
    $.post('php/admin_read.php',{'sort': "country"},function(data){
        var obj = JSON.parse(data);
        for(var key in obj){
            countries.push(obj[key].Country);
            };
        for (let i = 0; i < countries.length; i++) {
            $('#country').append('<option>'+countries[i]+'</option>')
        }; 
    });
});
$('#country').change(function(){
    $('#city option').remove();
    $('#city').append('<option disabled selected>Місто</option>')
    $.post('php/admin_read.php',{'sort':'city','country': ""+this.value+""},function(data){
        var cities = [];
        var obj = JSON.parse(data);
        for(var key in obj){
            cities.push(obj[key].City);
            };
        for (let i = 0; i < cities.length; i++) {
            $('#city').append('<option>'+cities[i]+'</option>')
        };
     });
 });
$('#forma').on('submit',function(e){
    e.preventDefault();
    $countryInput = $('select[name="country"]').val();
    $cityInput = $('select[name="city"]').val();
    $daysInput = $('input[name="days"]').val();
    $search = JSON.stringify({'Country':$countryInput, 'City':$cityInput, 'Days':$daysInput});
    console.log($search);
    if($countryInput==null||$cityInput==null){
        $('#page2').append("<p class='error'>Помилка! Потрібно вибрати хоча б 2 критеріїї: 'Країна' і 'Місто'</p>")
    }else{
        $.ajax({
            url: "/turiair/php/read.php",
            type: 'POST',
            data: $search,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(data) {
                for($i=0;$i<data.length;$i++){
                    $('#page2').prepend(
                    '<div>'+
                        '<h3>'+data[$i].Country+'<h3>'+
                        '<p>'+data[$i].City+'</p>'+
                        '<p>'+data[$i].Date_in+'</p>'+
                        '<p>'+data[$i].Days+'</p>'+
                    '</div>'
                    );
                };
                if(data==""){
                    $('#page2').append("<p class='error'>Вибачте! По данним критеріям інформаціїї не знайдено</p>");
                }
            },
            error: function (data) {
                console.log('Error', data.responseText);
            }
        });   
    }
    $('#forma').hide();
    $('#btnResearch').show();
});

$('#btnResearch').on('click',function(){
    $('#page2 p').hide();
    $('#page2 div').hide();
    $('#btnResearch').hide();
    $('#forma').show();
})
