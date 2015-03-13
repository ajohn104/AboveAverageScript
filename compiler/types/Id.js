// Id              ::= '[_$a-zA-Z][$\w]*(?=[^$\w]|$)'
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        if(parseTokens[envir.index].kind !== 'Id') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;
        debug("Finalizing id success. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index-1].lexeme);
        return true;
    }
};