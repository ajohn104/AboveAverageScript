// This            ::= '_'
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        if(parseTokens[envir.index].lexeme !== '_') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;
        return true;
    }
};