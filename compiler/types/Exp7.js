// Exp7            ::= Exp8 ('&' Exp8)*
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp7. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        if(!at(envir.Exp8)) {
            envir.index = indexBefore;
            return false;
        }

        while(parseTokens[envir.index].lexeme === '&') {
            envir.index++;
            if(!at(envir.Exp8)) {
                envir.index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp7 success. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        return true;
    }
};