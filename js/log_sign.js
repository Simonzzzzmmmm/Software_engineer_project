
function toSign_up() {
    window.open("index.html");
}

(function () {
    console.log("ajax");
    $.ajax({
        "type": 'post',
        "url": "/rpc",
        "dataType": "json",
        "data": {
            method: "eth_accounts",
            params: [],
        },
        "success": function (resp) {
            console.log(resp);
            if (resp.success) {
                alert('Enroll successfully');
                alert(resp.data);
            } else {
                alert('Enroll failed! Username existed');
            }
        },
        "error": function (emsg) {
            console.log(emsg);
            alert('Post failed');
        }
    });
}());