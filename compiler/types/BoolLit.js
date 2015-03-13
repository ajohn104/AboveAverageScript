// BoolLit         ::= 'true' | 'false'
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        if(parseTokens[envir.index].lexeme === 'true' || parseTokens[envir.index].lexeme === 'false') {
            envir.index++;
            return true;
        }
        
        return false;
    }
};