// Exp17           ::= Exp18 Call? (ArrayCont Call?)* ( ('.' Exp17)* | (Indent (Newline '.' Exp17)+ Dedent)) )?
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

        at(envir.Call);

        while(at(envir.ArrayCont)) {
            at(envir.Call);
        }
        var indexMid = envir.index;
        if(next('.')) {
            while(at('.')) {
                debug("Exp17: found '.' operator. envir.index:" + envir.index);
                if(!at(envir.Exp17)) {
                    envir.index = indexBefore; 
                    envir.inIndent = indentedBefore;
                    return false;
                }
            }
        } else if(at(envir.Indent) && at(envir.Newline) && at('.')) {
            debug("Exp17: found Indent. envir.index:" + envir.index);
            if(!at(envir.Exp17)) {
                envir.index = indexBefore; 
                envir.inIndent = indentedBefore;
                return false;
            }
            while(envir.parseTokens[envir.index] === '\\n' && envir.parseTokens[envir.index+1] === '.') {
                envir.index+=2;
                debug("Exp17: found Newline and '.' operator. envir.index:" + envir.index + ", lexeme: " + envir.parseTokens[envir.index].lexeme);
                if(!at(envir.Exp17)) {
                    envir.index = indexBefore; 
                    envir.inIndent = indentedBefore;
                    return false;
                }
            }
            if(!at(envir.Dedent)) {
                envir.index = indexBefore; 
                envir.inIndent = indentedBefore;
                return false;
            }
        } else {
            envir.index = indexMid;
        }   
        debug("Finalizing exp17 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};