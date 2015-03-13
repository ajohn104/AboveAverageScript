// Exp4            ::= Exp5 ('and' Exp5)*
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp4. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        if(!at(envir.Exp5)) {
            envir.index = indexBefore;
            return false;
        }

        while(parseTokens[envir.index].lexeme === 'and') {
            envir.index++;
            if(!at(envir.Exp5)) {
                envir.index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp4 success. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        return true;
    }
};