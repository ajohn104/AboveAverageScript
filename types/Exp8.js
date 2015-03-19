// Exp8            ::= Exp9 (EqualOp Exp9)*
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp8. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp9)) {
            envir.index = indexBefore;
            return false;
        }

        while(at(envir.EqualOp)) {
            if(!at(envir.Exp9)) {
                envir.index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp8 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};