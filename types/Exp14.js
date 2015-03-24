// Exp14           ::= PrefixOp? Exp15
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index; 
        var indentedBefore = envir.inIndent;
        debug("Starting on exp14. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(at(envir.PrefixOp)) {
            envir.checkIndent();
        }

        if(!at(envir.Exp15)) {
            envir.index = indexBefore; 
            envir.inIndent = indentedBefore;
            return false;
        }
        debug("Finalizing exp14 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};