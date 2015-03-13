// Exp14           ::= Exp15 PostfixOp?
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp14. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        if(!at(envir.Exp15)) {
            envir.index = indexBefore;
            return false;
        }

        at(envir.PostfixOp);
        debug("Finalizing exp14 success. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        return true;
    }
};