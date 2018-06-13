// $(".myclass") 获取所有class="myclass"的元素数组；
// $("#myid") 获取id="myid"的元素数组；长度为1；
// var hex = num.toString(16); 十进制int转十六进制字符串；
// var num = parseInt(hex); 0x前缀十六进制字符串转十进制int；
// var num = parseInt(hex, 16); 十六进制字符串转十进制int；
// var json = JSON.parse(json_string); 字符串转json
// var json_string = JSON.stringify(json); json转字符串

// 设置区块页面元素信息
function SetBlockInfo(data) {

    var hash_str = $("#hash")[0].innerText.split("\n");
    $("#hash")[0].innerText = $("#hash")[0].innerText.split("\n")[1];
    var size_str = $("#size")[0].innerText.split("\n");
    $("#size")[0].innerText = $("#size")[0].innerText.split("\n")[1];
    var timestamp_str = $("#timestamp")[0].innerText.split("\n");
    $("#timestamp")[0].innerText = $("#timestamp")[0].innerText.split("\n")[1];
    var totalTx_str = $("#totalTx")[0].innerText.split("\n");
    $("#totalTx")[0].innerText = $("#totalTx")[0].innerText.split("\n")[1];
    var gas_str = $("#gas")[0].innerText.split("\n");
    $("#gas")[0].innerText = $("#gas")[0].innerText.split("\n")[1];
    var difficulty_str = $("#difficulty")[0].innerText.split("\n");
    $("#difficulty")[0].innerText = $("#difficulty")[0].innerText.split("\n")[1];
    var miner_str = $("#miner")[0].innerText.split("\n");
    $("#miner")[0].innerText = $("#miner")[0].innerText.split("\n")[1];

    $("#hash")[0].innerText = hash_str[0]+$("#hash")[0].innerText.replace("loading", data.hash);
    $("#size")[0].innerHTML = size_str[0]+$("#size")[0].innerText.replace("loading", data.size);
    $("#timestamp")[0].innerHTML = timestamp_str[0]+data.timestamp;
    $("#totalTx")[0].innerHTML = totalTx_str[0]+data.transactions.length;
    $("#gas")[0].innerHTML = gas_str[0]+data.gasUsed;
    $("#difficulty")[0].innerHTML = difficulty_str[0]+data.difficulty;
    $("#miner")[0].innerHTML = miner_str[0]+data.miner;
}

function Back() {
    var hex = window.location.href.split("0x")[1];
    var num = parseInt(hex, 16);
    var new_num = num - 1;
    var new_hex = new_num.toString(16);

    location.href = window.location.href.split("0x")[0] + "0x" + new_hex;
}

function Next() {
    var hex = window.location.href.split("0x")[1];
    var num = parseInt(hex, 16);
    var new_num = num + 1;
    var new_hex = new_num.toString(16);

    window.location.href = window.location.href.split("0x")[0] + "0x" + new_hex;
}

$(document).ready(function () {
    var hex = window.location.href.split("0x")[1];
    var num = parseInt(hex, 16);
    
    $(".number")[0].innerHTML = num;
    $(".number")[1].innerHTML = num;

    $.ajax({
        "type": 'post',
        "url": "/rpc",
        "dataType": "json",
        "data": {
            method: "eth_getBlockByNumber",
            params: ["0x" + hex, true],
        },
        "success": function (resp) {
            console.log(resp);
            if (resp.success) {
                // alert('Enroll successfully');
                var obj = JSON.parse(resp.data);
                SetBlockInfo(obj.result);
            } else {
                alert('RPC failed');
            }
        },
        "error": function (emsg) {
            console.log(emsg);
            alert('Post failed');
        }
    });

});