// Exp             ::= Exp1 (ForIn | ForColon)*
module.exports = {
    is: function(at, next, envir, debug) {
        debug("Starting on exp. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        var indexBefore = envir.index; var indentedBefore = envir.inIndent;
        envir.indentedExp.push(envir.inIndented);
        envir.inIndented = false;
        
        if(!at(envir.Exp1)) {
            envir.index = indexBefore; envir.inIndent = indentedBefore;
            envir.inIndented = envir.indentedExp.pop();
            return false;
        }

        envir.checkIndent();

        while(at(envir.ForIn) || at(envir.ForColon)) {
            envir.checkIndent();
        }
        
        if(envir.inIndented && !at(envir.Dedent)) {
            debug("Unfinished indented exp. Exp failed.")
            envir.index = indexBefore; envir.inIndent = indentedBefore;
            envir.inIndented = envir.indentedExp.pop();
            return false;
        }
        envir.inIndented = envir.indentedExp.pop();
        debug("Finalizing exp success. envir.index:" + envir.index  + ', lexeme: ' + envir.parseTokens[envir.index].lexeme + '\n');
        return true;
    }
};