// Exp8            ::= Exp9 ('&' Exp9)*
module.exports = {
    is: function(at, next, envir, debug) {
        debug("Starting on exp8. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        var indexBefore = envir.index; 
        var indentedBefore = envir.inIndent;
        
        if(!at(envir.Exp9)) {
            envir.index = indexBefore; 
            envir.inIndent = indentedBefore;
            return false;
        }

        envir.checkIndent();
        var indexMid = envir.index;
        while(at('&')) {
            envir.checkIndent();
            if(!at(envir.Exp9)) {
                envir.index = indexMid;
                break;
            }
            indexMid = envir.index;
        }
        debug("Finalizing exp8 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};