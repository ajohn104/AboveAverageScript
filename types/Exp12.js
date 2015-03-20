// Exp12           ::= Exp13 (AddOp Exp13)*
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp12. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp13)) {
            envir.index = indexBefore;
            return false;
        }

        while(at(envir.AddOp)) {
            if(!at(envir.Exp13)) {
                envir.index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp12 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};