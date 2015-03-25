// Exp17           ::= Exp18 (ArrayCont | Call | '.' Exp17)*
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index; 
        var indentedBefore = envir.inIndent;
        debug("Starting on exp17. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp18)) {
            envir.index = indexBefore; 
            envir.inIndent = indentedBefore;
            return false;
        }
        var indented = false;
        while(next(envir.ArrayCont) || next(envir.Call) || next('.') || next(envir.Indent) || (indented && next(envir.Newline))) {
            if(indented && at(envir.Newline)) {
                ; // Just suck it up.
            } else if(at(envir.ArrayCont)) {
                ; // Just suck it up.
            } else if(at(envir.Call)) {
                ; // Just suck it up.
            } else if(at('.')) {
                if(!at(envir.Exp17)) {
                    envir.index = indexBefore;
                    return false;
                }
            } else if(at(envir.Indent)) {
                if(indented) {
                    envir.index = indexBefore;
                    debug("Serious indent issue in Exp17");
                    return false;
                }
                debug("Exp17: found Indent, grabbing Newline");
                indented = true;
                at(envir.Newline);
                if(!at('.')) {
                    envir.index = indexBefore;
                    return false;
                }
                if(!at(envir.Exp17)) {
                    envir.index = indexBefore;
                    return false;
                }
            }
        }
        if(indented && !at(envir.Dedent)) {
            envir.index = indexBefore;
            return false;
        }
        indented = false;
        debug("Finalizing exp17 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};