// Exp15           ::= 'new'? Exp16 Call?
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp15. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        if(parseTokens[envir.index].lexeme === 'new') {
            envir.index++;
        }

        if(!at(envir.Exp16)) {
            envir.index = indexBefore;
            return false;
        }

        at(envir.Call);
        debug("Finalizing exp15 success. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        return true;
    }
};