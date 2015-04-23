// PrefixOp        ::= '--' | '++' | '-' | '+' | '~' | 'not'
module.exports = function(env, at, next, debug) {
    var ops = ['--', '++', '-', '+', '~', 'not'];
    return {
        loadData: function() {},
        is: function() {
            var found = at(ops);
            if(found && env.last === 'not') {
                env.last = '!';
            }
            return found;
        }
    };
};