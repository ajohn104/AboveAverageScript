// Exp15           ::= 'new'? Exp16 Call?
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp15. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        at('new');

        if(!at(envir.Exp16)) {
            envir.index = indexBefore;
            return false;
        }

        at(envir.Call);
        debug("Finalizing exp15 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};