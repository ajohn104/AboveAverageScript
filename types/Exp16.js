// Exp16           ::= 'new'? Exp17 Call?
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index; 
        var indentedBefore = envir.inIndent;
        debug("Starting on exp16. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        at('new');

        if(!at(envir.Exp17)) {
            envir.index = indexBefore; 
            envir.inIndent = indentedBefore;
            return false;
        }

        at(envir.Call);
        debug("Finalizing exp16 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};