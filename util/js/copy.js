var copy = module.exports = {};

copy.deepCopy = function (obj) {
    return _deepCopy(obj);
}

function _deepCopy (obj){
    if(typeof obj != 'object'){
        return obj;
    }
    var newobj = {};
    for ( var attr in obj) {
        newobj[attr] = _deepCopy(obj[attr]);
    }
    return newobj;
};