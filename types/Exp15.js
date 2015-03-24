// Exp15           ::= Exp16 PostfixOp?
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index; 
        var indentedBefore = envir.inIndent;
        debug("Starting on exp15. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp16)) {
            envir.index = indexBefore; 
            envir.inIndent = indentedBefore;
            return false;
        }
        envir.checkIndent();

        at(envir.PostfixOp);
        debug("Finalizing exp15 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};