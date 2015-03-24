// Exp11           ::= Exp12 (ShiftOp Exp12)*
module.exports = {
    is: function(at, next, envir, debug) {
        debug("Starting on exp11. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        var indexBefore = envir.index; 
        var indentedBefore = envir.inIndent;
        
        if(!at(envir.Exp12)) {
            envir.index = indexBefore; 
            envir.inIndent = indentedBefore;
            return false;
        }

        envir.checkIndent();
        var indexMid = envir.index;
        while(at(envir.ShiftOp)) {
            envir.checkIndent();
            if(!at(envir.Exp12)) {
                envir.index = indexMid;
                break;
            }
            indexMid = envir.index;
        }
        debug("Finalizing exp11 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};