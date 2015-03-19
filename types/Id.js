// Id              ::= '[_$a-zA-Z][$\w]*(?=[^$\w]|$)'
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        if(envir.parseTokens[envir.index].kind !== 'Id') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;
        debug("Finalizing id success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index-1].lexeme);
        return true;
    }
};