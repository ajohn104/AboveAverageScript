// Exp3            ::= Exp4 ('or' Exp4)*
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp3. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        if(!at(envir.Exp4)) {
            envir.index = indexBefore;
            return false;
        }

        while(parseTokens[envir.index].lexeme === 'or') {
            envir.index++;
            if(!at(envir.Exp4)) {
                envir.index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp3 success. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        return true;
    }
};