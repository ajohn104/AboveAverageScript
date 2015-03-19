// Exp1            ::= Exp2 ('if' Exp2 ('else' Exp2)?)?
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp1. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp2)) {
            envir.index = indexBefore;
            return false;
        }

        if(at('if')) {
            if(!at(envir.Exp2)) {
                envir.index = indexBefore;
                return false;
            }
            if(at('else')) {
                if(!at(envir.Exp2)) {
                    envir.index = indexBefore;
                    return false;
                }
            }
        }
        debug("Finalizing exp1 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};