// Exp6            ::= Exp7 ('|' Exp7)*
module.exports = {
    is: function(at, next, envir, debug) {
        debug("Starting on exp6. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        var indexBefore = envir.index; 
        var indentedBefore = envir.inIndent;
        
        if(!at(envir.Exp7)) {
            envir.index = indexBefore; 
            envir.inIndent = indentedBefore;
            return false;
        }

        envir.checkIndent();
        var indexMid = envir.index;
        while(at('|')) {
            envir.checkIndent();
            if(!at(envir.Exp7)) {
                envir.index = indexMid;
                break;
            }
            indexMid = envir.index;
        }
        debug("Finalizing exp6 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};