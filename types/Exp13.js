// Exp13           ::= Exp14 (MulOp Exp14)*
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp13. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp14)) {
            envir.index = indexBefore;
            return false;
        }

        while(at(envir.MulOp)) {
            if(!at(envir.Exp14)) {
                envir.index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp13 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};