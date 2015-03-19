// Exp             ::= Exp1 (ForIn | ForColon)*
module.exports = {
    is: function(at, next, envir, debug) {
        debug("Starting on exp. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        var indexBefore = envir.index;
        
        if(!at(envir.Exp1)) {
            envir.index = indexBefore;
            return false;
        }

        while(at(envir.ForIn) || at(envir.ForColon));
        debug("Finalizing exp success. envir.index:" + envir.index  + ', lexeme: ' + envir.parseTokens[envir.index].lexeme + '\n');
        return true;
    }
};