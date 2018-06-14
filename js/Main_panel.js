
var max_height;
var current_height;
var blockPerPage = 10;

function hex2int(hex) {
    var num = parseInt(hex);
    return num;
}

function parseArray(datas) {
    for (var i = 0; i < datas.length; i++) {
        var data = datas[i];
        var obj = JSON.parse(data);
        datas[i] = obj.result;
    }
}

function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (hex2int(arr[j].number) < hex2int(arr[j + 1].number)) {        //相邻元素两两对比
                var temp = arr[j + 1];        //元素交换
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

function BlockPage() {
    $.ajax({
        "type": 'get',
        "url": "/BlockPage",
        "dataType": "json",
        "data": {},
        "success": function (resp) {
            console.log(resp);
            if (resp.success) {
                // alert('Enroll successfully');
                // alert(resp.data);
                var datas = resp.data;
                parseArray(datas);
                datas = bubbleSort(datas);
                max_height = hex2int(datas[0].number);
                current_height = max_height;
                $('#block_height')[0].innerHTML = max_height;
                $('#difficulty')[0].innerHTML = datas[0].difficulty;
                SetTxPage(datas);
                AddBlocks(datas);
            } else {
                alert('RPC failed');
            }
        },
        "error": function (emsg) {
            console.log(emsg);
            alert('ajax failed');
        }
    });
}


function PrevBlockPage() {
    if (current_height + blockPerPage > max_height) {
        return;
    }
    var start = current_height + 1;
    var end = current_height + blockPerPage + 1;
    UpdateBlockPage(start, end);
}

function NextBlockPage() {
    if (current_height - blockPerPage < 0) {
        return;
    }
    var start = Math.max(current_height - 2 * blockPerPage + 1, 0);
    var end = current_height - blockPerPage + 1;
    console.log(typeof start, typeof end);
    UpdateBlockPage(start, end);
}

function ClearBlockpage() {
    $(".block").remove();
}


function UpdateBlockPage(start, end) {
    $.ajax({
        "type": 'post',
        "url": "/UpdateBlockPage",
        "dataType": "json",
        "data": { start: start, end: end },
        "success": function (resp) {
            console.log(resp);
            if (resp.success) {
                var datas = resp.data;
                parseArray(datas);
                datas = bubbleSort(datas);
                current_height = hex2int(datas[0].number);
                ClearBlockpage();
                AddBlocks(datas);
            } else {
                alert('RPC failed');
            }
        },
        "error": function (emsg) {
            console.log(emsg);
            alert('ajax failed');
        }
    });
}

// 将区块模板添加进区块面板
function AddBlocks(datas) {
    console.log(datas);

    for (var index = 0; index < datas.length; index++) {
        var obj = datas[index];
        // var obj = JSON.parse(data);
        // var hash = obj.hash;
        var number = obj.number;
        var timestamp = obj.timestamp;
        var miner = obj.miner;
        var block = document.querySelector('#block_template');
        // block.content.querySelector('#hash').innerHTML = hash;
        block.content.querySelector('#number').innerHTML = number;
        block.content.querySelector('#timestamp').innerHTML = timestamp;
        block.content.querySelector('#miner').innerHTML = miner;
        block.content.querySelector('#number').href = "/Block_info/" + number;
        $("#block_panel").append(block.content.cloneNode(true));
    }
}

function SetTxPage(blocks) {
    console.log(blocks);
    var MAX_TX = 30;
    var tx_count = 0;

    for (var index = 0; index < blocks.length; index++) {
        var block = blocks[index];
        var txs = block.transactions;
        for (var ti = 0; ti < txs.length; ti++) {
            const tx = txs[ti];
            var hash = tx.hash;
            var from = tx.from;
            var to = tx.to;
            var amount = tx.value;
            var tx_template = document.querySelector('#tx_template');
            tx_template.content.querySelector('#transaction').innerHTML = hash;
            tx_template.content.querySelector('#from').innerHTML = from;
            tx_template.content.querySelector('#to').innerHTML = to;
            tx_template.content.querySelector('#amount').innerHTML = amount;
            tx_template.content.querySelector('#transaction').href = "/Tx_info/" + hash;
            $("#tx_panel").append(tx_template.content.cloneNode(true));
            tx_count++;
            if (tx_count >= MAX_TX) {
                return;
            }
        }
    }
}


function rpc() {
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
                alert('RPC success');
                alert(resp.data);
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

$(document).ready(function () {
    BlockPage();

});

// (function () {


// }());