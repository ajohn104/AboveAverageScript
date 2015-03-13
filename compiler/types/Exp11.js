// Exp11           ::= Exp12 (AddOp Exp12)*
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp11. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        if(!at(envir.Exp12)) {
            envir.index = indexBefore;
            return false;
        }

        while(at(envir.AddOp)) {
            if(!at(envir.Exp12)) {
                envir.index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp11 success. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        return true;
    }
};