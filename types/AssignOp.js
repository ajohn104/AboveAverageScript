// AssignOp        ::= '=' | '+=' |'-=' | '*=' | '/=' | '%=' | '<<=' | '>>=' | '>>>=' | '&=' | '^=' | '|='
module.exports = function(env, at, next, debug) {
    var ops = ['=', '+=', '-=', '*=', '/=', '%=', '<<=', '>>=', '>>>=', '&=', '^=', '|='];
    return {
        loadData: function() {},
        is: function() {
            return at(ops);
        }
    };
};