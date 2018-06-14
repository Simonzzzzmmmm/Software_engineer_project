
var http = require('http'),
    copy = require(global.ROOTPATH + '/util/js/copy.js'),
    dp = require(global.ROOTPATH + '/util/js/dprint.js');

var rpc = module.exports = {};

// 单次post
rpc.single_post = function (res, method, params) {
    for (var index = 0; index < params.length; index++) {
        const element = params[index];
        if (element == "false") {
            params[index] = false;
        } else if (element == "true") {
            params[index] = true;
        }
    }
    var postData = JSON.stringify({
        jsonrpc: "2.0",
        method: method,
        params: params,
        id: 1
    });
    var success = function (data) {
        res.json({ "success": true, "data": data });
    }
    var fail = function (err) {
        res.json({ "success": false, "err": err });
    }
    post(postData, success, fail);
}

rpc.getBlockPage = function (res) {
    var blockPerPage = 10;
    var postData = JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
        id: 1
    });
    var success = function (data) {
        // res.json({"success":true, "data":data});
        var hex = JSON.parse(data).result;
        var num = parseInt(hex);
        rpc.getBlockByIndexes(res, Math.max(num - blockPerPage, 0), num);
    }
    var fail = function (err) {
        res.json({ "success": false, "err": err });
    }
    post(postData, success, fail);
}


rpc.getBlockByIndexes = function (res, start, end) {
    var result = [];
    var failed = false;
    // console.log(typeof start, typeof end);
    for (var index = start; index < end; index++) {
        var hex = "0x" + index.toString(16);
        var postData = JSON.stringify({
            jsonrpc: "2.0",
            method: "eth_getBlockByNumber",
            params: [hex, true],
            id: 1
        });
        console.log(index, hex, typeof index);
        var success = function (data) {
            console.log(index, hex,  data);
            result.push(data);
            if (result.length == end - start) {
                res.json({ "success": true, "data": result });
            }
        }
        var fail = function (err) {
            if (!failed) {
                res.json({ "success": false, "err": err });
            }
            failed = true;
        }
        // console.log(postData);
        post(postData, success, fail);
    }
}

rpc.getTxPage = function (res) {
    var postData = JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
        id: 1
    });
    var success = function (data) {
        // res.json({"success":true, "data":data});
        var hex = JSON.parse(data).result;
        var num = parseInt(hex);
        rpc.getBlockByIndexes(res, 0, 10);
    }
    var fail = function (err) {
        res.json({ "success": false, "err": err });
    }
    post(postData, success, fail);
}

function post(postData, success, fail) {

    //发送 http Post 请求  
    var options = {
        hostname: global.RPC_IP,
        port: global.RPC_PORT,
        path: '',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    }
    var rpc_req = http.request(options, function (rpc_res) {
        var buffer = "";
        dp.print('Status:', rpc_res.statusCode);
        dp.print('headers:', JSON.stringify(rpc_res.headers));
        rpc_res.setEncoding('utf-8');
        rpc_res.on('data', function (data) {
            buffer = buffer + data;
        });
        rpc_res.on('end', function () {
            success(buffer);
            dp.print('No more data in rpc_response.********');
        });
    });
    rpc_req.on('error', function (err) {
        console.error(err);
        fail(err);
    });
    rpc_req.write(postData);
    rpc_req.end();
}
