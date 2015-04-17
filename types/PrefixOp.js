// PrefixOp        ::= '--' | '++' | '-' | '+' | '~' | 'not'
module.exports = {
    is: function(at, next, env, debug) {
        var ops = ['--', '++', '-', '+', '~', 'not'];
        var found = at(ops);
        if(found && envir.last === 'not') {
            envir.last === '!';
        }
        return found;
    }
};