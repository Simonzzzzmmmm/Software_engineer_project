var http = require('http'); 

function rpc() {
    // 获取所有帐户
    this.eth_accounts = function (res, params) {
        var postData=JSON.stringify({ 
            jsonrpc:"2.0",
            method:"eth_accounts",
            params:params,
            id:1
        });  
        post(res, postData);
    };

    // 新建帐户
    this.personal_newAccount = function (res, params) {
        var postData=JSON.stringify({ 
            jsonrpc:"2.0",
            method:"personal_newAccount",
            params:params,
            id:1
        });  
        post(res, postData);
    };

    // 查询帐户余额
    this.eth_getBalance = function (res, params) {
        var postData=JSON.stringify({ 
            jsonrpc:"2.0",
            method:"eth_getBalance",
            params:params,
            id:1
        });  
        post(res, postData);
    };

    // 发送交易
    this.personal_sendTransaction = function (res, params) {
        var postData=JSON.stringify({ 
            jsonrpc:"2.0",
            method:"personal_sendTransaction",
            params:params,
            id:1
        });  
        post(res, postData);
    };

    // 获取交易状态
    this.eth_getTransactionByHash = function (res, params) {
        var postData=JSON.stringify({ 
            jsonrpc:"2.0",
            method:"eth_getTransactionByHash",
            params:[],
            id:1
        });  
        post(res, postData);
    };

    // 获取块的数量
    this.eth_blockNumber = function (res, params) {
        var postData=JSON.stringify({ 
            jsonrpc:"2.0",
            method:"eth_blockNumber",
            params:params,
            id:1
        });  
        post(res, postData);
    };

    // 根据块编号获取块内容
    this.eth_getBlockByNumber = function (res, params) {
        var postData=JSON.stringify({ 
            jsonrpc:"2.0",
            method:"eth_getBlockByNumber",
            params:[],
            id:1
        });  
        post(res, postData);
    };
}

function post(res, postData) {
     
    //发送 http Post 请求  
    var options={  
       hostname:global.RPC_IP,  
       port:global.RPC_PORT,  
       path:'',  
       method:'POST',  
       headers:{  
        //'Content-Type':'application/x-www-form-urlencoded',  
        'Content-Type':'application/json',  
        'Content-Length':Buffer.byteLength(postData)  
       }  
    }  
    var rpc_req=http.request(options, function(rpc_res) {  
        console.log('Status:',rpc_res.statusCode);  
        console.log('headers:',JSON.stringify(rpc_res.headers));  
        rpc_res.setEncoding('utf-8');  
        rpc_res.on('data',function(data){   
            console.info(data);
            res.json({"success":true, data:data});
        });  
        rpc_res.on('end',function(){  
            console.log('No more data in rpc_response.********');  
        });  
    });  
    rpc_req.on('error',function(err){  
        console.error(err); 
        res.json({"success":false, err:err});
    });  
    rpc_req.write(postData);  
    rpc_req.end();  
}

module.exports = rpc;