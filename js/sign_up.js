
function sign_up() {
    if ($("#password1")[0].value == $("#password2")[0].value) {
        $.ajax({
            "type": 'post',
            "url": "/rpc",
            "dataType": "json",
            "data": {
                method: "personal_newAccount",
                params: [$("#password1")[0].value],
            },
            "success": function (resp) {
                console.log(resp);
                var data = JSON.parse(resp.data);
                if (resp.success) {
                    alert("Sign up successful! Your account is:"
                        + data.result
                        + "                         Please remember!");
                } else {
                    alert('RPC failed');
                }
            },
            "error": function (emsg) {
                console.log(emsg);
                alert('Post failed');
            }
        });
    } else {
        alert("两次密码不一样");
    }
}


(function ($) {
    "use strict";


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }



})(jQuery);
