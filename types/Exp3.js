// Exp3            ::= Exp4 ('?' Exp4 ':' Exp4)?
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index; 
        var indentedBefore = envir.inIndent;
        debug("Starting on exp3. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp4)) {
            envir.index = indexBefore; 
            envir.inIndent = indentedBefore;
            return false;
        }
        envir.checkIndent();
        if(at('?')) {
            envir.checkIndent();
            if(!at(envir.Exp4)) {
                envir.index = indexBefore; 
                envir.inIndent = indentedBefore;
                return false;
            }
            envir.checkIndent();
            if(!at(':')) {
                envir.index = indexBefore; 
                envir.inIndent = indentedBefore;
                return false;
            }
            envir.checkIndent();
            if(!at(envir.Exp4)) {
                envir.index = indexBefore; 
                envir.inIndent = indentedBefore;
                return false;
            }
        }
        debug("Finalizing exp3 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};