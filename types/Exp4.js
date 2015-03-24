// Exp4            ::= Exp5 ('or' Exp5)*
module.exports = {
    is: function(at, next, envir, debug) {
        debug("Starting on exp4. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        var indexBefore = envir.index; 
        var indentedBefore = envir.inIndent;
        
        if(!at(envir.Exp5)) {
            envir.index = indexBefore; 
            envir.inIndent = indentedBefore;
            return false;
        }

        envir.checkIndent();
        var indexMid = envir.index;
        while(at('or')) {
            envir.checkIndent();
            if(!at(envir.Exp5)) {
                envir.index = indexMid;
                break;
            }
            indexMid = envir.index;
        }
        debug("Finalizing exp4 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};