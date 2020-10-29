var globalFunction = {};
globalFunction.validateFunction = function(input) {
    if (input === null)
        input = '';
    return input;
}
globalFunction.formatNumberLength = function(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}
module.exports = globalFunction;