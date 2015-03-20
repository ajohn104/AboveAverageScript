// Exp10           ::= Exp11 (CompareOp Exp11)*
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp10. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp11)) {
            envir.index = indexBefore;
            return false;
        }

        while(at(envir.CompareOp)) {
            if(!at(envir.Exp11)) {
                envir.index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp10 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};