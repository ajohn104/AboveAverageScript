// Newline         ::= '\n'
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        if(parseTokens[envir.index].lexeme !== '\\n') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;
        return true;
    }
};