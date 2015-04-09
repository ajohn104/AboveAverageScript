// PrefixOp        ::= '--' | '++' | '-' | '+' | '~' | 'not'
module.exports = {
    is: function(at, next, env, debug) {
        var ops = ['--', '++', '-', '+', '~', 'not'];
        return at(ops);
    }
};