// Exp10           ::= Exp11 (ShiftOp Exp11)*
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp10. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        if(!at(envir.Exp11)) {
            envir.index = indexBefore;
            return false;
        }

        while(at(envir.ShiftOp)) {
            if(!at(envir.Exp11)) {
                envir.index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp10 success. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        return true;
    }
};