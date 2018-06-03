//debug printer
//开启后将打印print传进来的内容，不开启时不打印

"use strict";
var dprint = module.exports = {};


dprint.enable = global.dpEnable;

//设置是否开启dprint
dprint.setEnable = function (enable){
	global.dpEnable = dprint.enable = enable;
}

dprint.print = function (){
	if (this.enable) {
		var str = '';
		for (var i in arguments) {
			if (typeof arguments[i] == 'undefined') {
				str += 'undefined';
			} else if(typeof arguments[i] == 'object'){
				str += JSON.stringify(arguments[i]);
			} else {
				str += arguments[i].toString();
			}
			str += ' ';
		};
		console.log(str);
	}
}
