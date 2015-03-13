// Exp5            ::= Exp6 ('|' Exp6)*
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp5. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        if(!at(envir.Exp6)) {
            envir.index = indexBefore;
            return false;
        }

        while(parseTokens[envir.index].lexeme === '|') {
            envir.index++;
            if(!at(envir.Exp6)) {
                envir.index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp5 success. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        return true;
    }
};