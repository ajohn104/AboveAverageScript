// Exp4            ::= Exp5 ('and' Exp5)*
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp4. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp5)) {
            envir.index = indexBefore;
            return false;
        }

        while(at('and')) {
            if(!at(envir.Exp5)) {
                envir.index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp4 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};