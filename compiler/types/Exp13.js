// Exp13           ::= PrefixOp? Exp14
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp13. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        at(envir.PrefixOp);

        if(!at(envir.Exp14)) {
            envir.index = indexBefore;
            return false;
        }
        debug("Finalizing exp13 success. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        return true;
    }
};