$(".button").click(function(){
    $(this).toggleClass("active");
    return false;
});


// LOL CODEPEN FRONTPAGE ALERT
// Sorry @codepen! :D
var i = 0;
if(document.location.pathname != "/pen/secure_iframe") {
  var interval = setInterval(function(){
    $("html, body").toggleClass("blinking");
    if(i >= 7)
       clearInterval(interval); 
    else
       i++;
  }, 250);
}
$('.form-head').click(function(){

    if($(this).closest('.grop-from').attr('id')=='signup'){
        $('.grop-from').attr('id' , 'name');
        $('.icon-action').addClass('back');
    }
    else if($(this).closest('.grop-from').attr('id')=='success'){
        $('.grop-from').attr('id' , 'signup');
        $('input').val('');
    }

});




$('.form-action').click(function(){

    var form_id = $('.grop-from').attr('id');
    $('.icon-action').addClass('back');

    if($('#control-' + form_id).val() != ''){
        switch (form_id) {
            case 'name':
                form_id = "value";
                break;
            case "value":
                form_id = "account";
                break;
            case "account":
                form_id = "password";
                break;
            case "password":
                form_id = "password-repeat";
                break;
            case "password-repeat":
                form_id = "success";
                break;
            case "success":
                window.location.href = "DashBoard2.html";
                break;
        }
        $('.icon-action').addClass('back');

    }

    else{
        switch (form_id) {
            case 'name':
                form_id = "signup";
                $('.icon-action').removeClass('back');
                break;
            case "value":
                form_id = "name";
                break;
            case "account":
                form_id = "value";
                break;
            case "password":
                form_id = "account";
                break;
            case "password-repeat":
                form_id = "password";
                break;
             case "success":
                 window.location.href = "DashBoard2.html";
                break;
        }
        $('.icon-action').removeClass('back');
    }

    $('.grop-from').attr('id' , form_id);

});

$('input').keyup(function(){
    $('.grop-from').removeClass('error');
    $('.error-text').fadeOut();

    if($(this).val()!=''){
        $('.icon-action').removeClass('back');
    }
    else{
        $('.icon-action').addClass('back');
    }


})
