
function trans_make() {
    var payer = $("#payer")[0].value;
    var value = $("#value")[0].value;
    var reciever = $("#reciever")[0].value;
    var password = "";
    if ($("#password")[0].className == "grop-from") {
        password = $("#password")[0][3].value;
    } else {
        password = $("#password")[0].value;
    }

    if (payer == "") {
        return;
    } else if (value == "") {
        return;
    } else if (reciever == "") {
        return;
    } else if (password == "") {
        return;
    };

    var json = {
        "from": payer,
        "to": reciever,
        "value": "0x" + value.toString(16),
    };

    $.ajax({
        "type": 'post',
        "url": "/rpc",
        "dataType": "json",
        "data": {
            method: "personal_sendTransaction",
            params: [JSON.stringify(json), password],
        },
        "success": function (resp) {
            console.log(resp);
            var data = JSON.parse(resp.data);
            if (resp.success) {
                if (data.result) {
                    alert(JSON.stringify(data.result));
                } else {
                    alert(JSON.stringify(data.error));
                }
            } else {
                alert('RPC failed');
            }
        },
        "error": function (emsg) {
            console.log(emsg);
            alert('Post failed');
        }
    });

}