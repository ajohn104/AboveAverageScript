// Exp3            ::= Exp4 ('?' Exp4 ':' Exp4)?
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp3. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp4)) {
            envir.index = indexBefore;
            return false;
        }
        if(at('?')) {
            if(!at(envir.Exp4)) {
                envir.index = indexBefore;
                return false;
            }
            if(!at(':')) {
                envir.index = indexBefore;
                return false;
            }
            if(!at(envir.Exp4)) {
                envir.index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp3 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};