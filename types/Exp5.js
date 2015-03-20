// Exp5            ::= Exp6 ('and' Exp6)*
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp5. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp6)) {
            envir.index = indexBefore;
            return false;
        }

        while(at('and')) {
            if(!at(envir.Exp6)) {
                envir.index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp5 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};