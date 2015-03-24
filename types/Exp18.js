// Exp18           ::= Exp19
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index; 
        var indentedBefore = envir.inIndent;
        debug("Starting on exp18. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp19)) {
            envir.index = indexBefore; 
            envir.inIndent = indentedBefore;
            return false;
        }
        debug("Finalizing exp18 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};