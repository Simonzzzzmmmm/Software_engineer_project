// $(".myclass") 获取所有class="myclass"的元素数组；
// $("#myid") 获取id="myid"的元素数组；长度为1；
// var hex = num.tostring(16); 十进制int转十六进制字符串；
// var num = parseInt(hex, 16); 十六进制字符串转十进制int；
// var json = JSON.parse(json_string); 字符串转json
// var json_string = JSON.stringify(json); json转字符串

// 设置区块页面元素信息
function setBlockInfo(data) {
    // console.log(data);
    $("#hash")[0].innerText = $("#hash")[0].innerText.replace("loading", data.hash);
    $("#size")[0].innerHTML = data.size;
    $("#timestamp")[0].innerHTML = data.timestamp;
    $("#totalTx")[0].innerHTML = data.transactions.length;
    $("#gas")[0].innerHTML = data.gasUsed;
    $("#difficulty")[0].innerHTML = data.difficulty;
    $("#miner")[0].innerHTML = data.miner;
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
            params: ["0x" + hex, false],
        },
        "success": function (resp) {
            // console.log(resp);
            if (resp.success) {
                // alert('Enroll successfully');
                var obj = JSON.parse(resp.data);
                setBlockInfo(obj.result);
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