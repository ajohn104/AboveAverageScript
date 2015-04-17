// PrefixOp        ::= '--' | '++' | '-' | '+' | '~' | 'not'
module.exports = {
    is: function(at, next, env, debug) {
        var ops = ['--', '++', '-', '+', '~', 'not'];
        var found = at(ops);
        if(found && env.last === 'not') {
            env.last = '!';
        }
        return found;
    }
};