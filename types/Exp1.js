// Exp1            ::= Exp2 ('if' Exp2 ('else' Exp2)?)?
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var indentedBefore = envir.inIndent;
        debug("Starting on exp1. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp2)) {
            envir.index = indexBefore;
            envir.inIndent = indentedBefore;
            return false;
        }
        envir.checkIndent();
        if(at('if')) {
            envir.checkIndent();
            if(!at(envir.Exp2)) {
                envir.index = indexBefore;
                envir.inIndent = indentedBefore;
                return false;
            }
            envir.checkIndent();
            if(at('else')) {
                envir.checkIndent();
                if(!at(envir.Exp2)) {
                    envir.index = indexBefore;
                    envir.inIndent = indentedBefore;
                    return false;
                }
            }
        }
        debug("Finalizing exp1 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};