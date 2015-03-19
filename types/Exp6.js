// Exp6            ::= Exp7 ('^' Exp7)*
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp6. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp7)) {
            envir.index = indexBefore;
            return false;
        }

        while(at('^')) {
            if(!at(envir.Exp7)) {
                envir.index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp6 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};