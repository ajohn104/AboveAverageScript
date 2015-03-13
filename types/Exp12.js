// Exp12           ::= Exp13 (MulOp Exp13)*
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp12. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        if(!at(envir.Exp13)) {
            envir.index = indexBefore;
            return false;
        }

        while(at(envir.MulOp)) {
            if(!at(envir.Exp13)) {
                envir.index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp12 success. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        return true;
    }
};