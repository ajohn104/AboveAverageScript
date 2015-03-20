// Exp9            ::= Exp10 (EqualOp Exp10)*
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp9. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp10)) {
            envir.index = indexBefore;
            return false;
        }

        while(at(envir.EqualOp)) {
            if(!at(envir.Exp10)) {
                envir.index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp9 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};