// PrefixOp        ::= '--' | '++' | '-' | '+' | '~' | 'not'
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        var ops = ['--', '++', '-', '+', '~', 'not'];
        if(ops.indexOf(parseTokens[envir.index].lexeme) === -1) {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;

        return true;
    }
};