// $(".myclass") 获取所有class="myclass"的元素数组；
// $("#myid") 获取id="myid"的元素数组；长度为1；
// var hex = num.toString(16); 十进制int转十六进制字符串；
// var num = parseInt(hex); 0x前缀十六进制字符串转十进制int；
// var num = parseInt(hex, 16); 十六进制字符串转十进制int；
// var json = JSON.parse(json_string); 字符串转json
// var json_string = JSON.stringify(json); json转字符串

// 设置交易页面元素信息
function SetTxInfo(data) {
    // console.log(data);
    $("#from")[0].innerHTML = data.from;
    $("#to")[0].innerHTML = data.to;
    $("#value")[0].innerHTML = data.value;
    $("#gas")[0].innerHTML = data.gas;
    $("#gasPrice")[0].innerHTML = data.gasPrice;
    $("#blockNumber")[0].innerHTML = data.blockNumber;
    $("#blockNumber")[0].href = "/Block_info/" + data.blockNumber;
    $("#blockHash")[0].innerHTML = data.blockHash;
}


$(document).ready(function () {
    var hex = window.location.href.split("0x")[1];
    var num = parseInt(hex, 16);
    
    $(".hash")[0].innerHTML = "0x" + hex;
    $(".hash")[1].innerHTML = "0x" + hex;

    $.ajax({
        "type": 'post',
        "url": "/rpc",
        "dataType": "json",
        "data": {
            method: "eth_getTransactionByHash",
            params: ["0x" + hex],
        },
        "success": function (resp) {
            // console.log(resp);
            if (resp.success) {
                // alert('Enroll successfully');
                var obj = JSON.parse(resp.data);
                SetTxInfo(obj.result);
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