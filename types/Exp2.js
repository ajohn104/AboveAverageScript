// Exp2            ::= Exp3 ('in' Exp3)*
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var indentedBefore = envir.inIndent;
        debug("Starting on exp2. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);

        if(!at(envir.Exp3)) {
            envir.index = indexBefore;
            envir.inIndent = indentedBefore;
            return false;
        }
        envir.checkIndent();
        var indexMid = envir.index;
        while(at('in')) {
            envir.checkIndent();
            if(!at(envir.Exp3)) {
                envir.index = indexMid;
                break;
            }
            indexMid = envir.index;
        }
        debug("Finalizing exp2 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};