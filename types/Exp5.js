// Exp5            ::= Exp6 ('and' Exp6)*
module.exports = {
    is: function(at, next, envir, debug) {
        debug("Starting on exp5. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        var indexBefore = envir.index; 
        var indentedBefore = envir.inIndent;

        if(!at(envir.Exp6)) {
            envir.index = indexBefore; 
            envir.inIndent = indentedBefore;
            return false;
        }

        envir.checkIndent();
        var indexMid = envir.index;
        while(at('and')) {
            envir.checkIndent();
            if(!at(envir.Exp6)) {
                envir.index = indexMid;
                break;
            }
            indexMid = envir.index;
        }
        debug("Finalizing exp5 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};