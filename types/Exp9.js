// Exp9            ::= Exp10 (EqualOp Exp10)*
module.exports = {
    is: function(at, next, envir, debug) {
        debug("Starting on exp9. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        var indexBefore = envir.index; 
        var indentedBefore = envir.inIndent;
        
        if(!at(envir.Exp10)) {
            envir.index = indexBefore; 
            envir.inIndent = indentedBefore;
            return false;
        }

        envir.checkIndent();
        var indexMid = envir.index;
        while(at(envir.EqualOp)) {
            envir.checkIndent();
            if(!at(envir.Exp10)) {
                envir.index = indexMid;
                break;
            }
            indexMid = envir.index;
        }
        debug("Finalizing exp9 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};