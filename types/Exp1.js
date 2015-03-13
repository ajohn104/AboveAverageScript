// Exp1            ::= Exp2 ('if' Exp2 ('else' Exp2)?)?
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp1. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        if(!at(envir.Exp2)) {
            envir.index = indexBefore;
            return false;
        }

        if(parseTokens[envir.index].lexeme === 'if') {
            envir.index++;
            if(!at(envir.Exp2)) {
                envir.index = indexBefore;
                return false;
            }
            if(parseTokens[envir.index].lexeme === 'else') {
                envir.index++;
                if(!at(envir.Exp2)) {
                    envir.index = indexBefore;
                    return false;
                }
            }
        }
        debug("Finalizing exp1 success. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        return true;
    }
};