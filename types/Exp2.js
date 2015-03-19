// Exp2            ::= Exp3 ('?' Exp3 ':' Exp3)?
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp2. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp3)) {
            envir.index = indexBefore;
            return false;
        }
        if(at('?')) {
            if(!at(envir.Exp3)) {
                envir.index = indexBefore;
                return false;
            }
            if(!at(':')) {
                envir.index = indexBefore;
                return false;
            }
            if(!at(envir.Exp3)) {
                envir.index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp2 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};