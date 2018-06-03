
function BlockPage() {
    $.ajax({
        "type": 'get',
        "url": "/BlockPage",
        "dataType": "json",
        "data": {},
        "success": function (resp) {
            console.log(resp);
            if (resp.success) {
                alert('Enroll successfully');
                alert(resp.data);
                for (let index = 0; index < resp.data.length; index++) {
                    AddBlock(resp.data[index]);
                }
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
function AddBlock(data) {
    console.log(data);
    var obj = JSON.parse(data);
    // var hash = obj.result.hash;
    var number = obj.result.number;
    var timestamp = obj.result.timestamp;
    var miner = obj.result.miner;
    var block = document.querySelector('#block_template');
    // block.content.querySelector('#hash').innerHTML = hash;
    block.content.querySelector('#number').innerHTML = number;
    block.content.querySelector('#timestamp').innerHTML = timestamp;
    block.content.querySelector('#miner').innerHTML = miner;
    block.content.querySelector('#a').href = "/Block_info/" + number;
    $("#block_panel").append(block.content.cloneNode(true));
}

function TxPage() {
    $.ajax({
        "type": 'post',
        "url": "/TxPage",
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

$(document).ready(function (){
    BlockPage();
    
});

// (function () {
    
    
// }());