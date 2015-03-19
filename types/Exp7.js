// Exp7            ::= Exp8 ('&' Exp8)*
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp7. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp8)) {
            envir.index = indexBefore;
            return false;
        }

        while(at('&')) {
            if(!at(envir.Exp8)) {
                envir.index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp7 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};