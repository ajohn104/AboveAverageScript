// PrefixOp        ::= '--' | '++' | '-' | '+' | '~' | 'not'
module.exports = {
    is: function(at, next, envir, debug) {
        var ops = ['--', '++', '-', '+', '~', 'not'];
        return at(ops);
    }
};