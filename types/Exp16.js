// Exp16           ::= Exp17 Call? (ArrayCont Call?)* ( ('.' Exp16)* | (Indent (Newline '.' Exp16)+ Dedent)) )?
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp16. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        if(!at(envir.Exp17)) {
            envir.index = indexBefore;
            return false;
        }

        at(envir.Call);

        while(at(envir.ArrayCont)) {
            at(envir.Call);
        }

        if(parseTokens[envir.index].lexeme === '.') {
            while(parseTokens[envir.index].lexeme === '.') {
                debug("Exp16: found '.' operator. envir.index:" + envir.index);
                envir.index++;
                if(!at(envir.Exp16)) {
                    envir.index = indexBefore;
                    return false;
                }
            }
        } else if(at(envir.Indent)) {
            debug("Exp16: found Indent. envir.index:" + envir.index);
            if(parseTokens[envir.index].lexeme !== '\\n' || parseTokens[envir.index+1].lexeme !== '.') {
                envir.index = indexBefore;
                return false;
            }
            while(parseTokens[envir.index].lexeme === '\\n' && parseTokens[envir.index+1].lexeme === '.') {
                envir.index+=2;
                debug("Exp16: found Newline and '.' operator. envir.index:" + envir.index + ", lexeme: " + parseTokens[envir.index].lexeme);
                if(!at(envir.Exp16)) {
                    envir.index = indexBefore;
                    return false;
                }
            }
            if(!at(envir.Dedent)) {
                envir.index = indexBefore;
                return false;
            }
        }        
        debug("Finalizing exp16 success. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        return true;
    }
};