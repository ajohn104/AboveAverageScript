// ConsumeStmt     ::= (Exp (',' Exp)*)? '<-' Id (('.' Id)* ArrayCont+ Call?)+
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;

        at(envir.Exp);

        while(parseTokens[envir.index].lexeme === ',') {
            envir.index++;
            if(!at(envir.Exp)) {
                envir.index = indexBefore;
                return false;
            }
        }
        debug("ConsumeStmt: checking for '<-'. envir.index:" + envir.index + ", lexeme:" + parseTokens[envir.index].lexeme);
        if(parseTokens[envir.index].lexeme !== '<-') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;
        debug("ConsumeStmt: found '<-'. checking for Id. envir.index:" + envir.index + ", lexeme:" + parseTokens[envir.index].lexeme);
        if(!at(envir.Id)) {
            envir.index = indexBefore;
            return false;
        }
        
        if(parseTokens[envir.index].lexeme === '.' || at(envir.ArrayCont)) {
            if(parseTokens[envir.index].lexeme === '.') {
                while(parseTokens[envir.index].lexeme === '.') {
                    envir.index++;
                    if(!at(envir.Id)) {
                        envir.index = indexBefore;
                        return false;
                    }
                    
                }
                if(!at(envir.ArrayCont)) {
                    envir.index = indexBefore;
                    return false;
                }
                while(at(envir.ArrayCont));
                at(envir.Call);
            }
        } else {
            envir.index = indexBefore;
            return false;
        }
        while(parseTokens[envir.index].lexeme === '.' || at(envir.ArrayCont)) {
            if(parseTokens[envir.index].lexeme === '.') {
                while(parseTokens[envir.index].lexeme === '.') {
                    envir.index++;
                    if(!at(envir.Exp16)) {
                        envir.index = indexBefore;
                        return false;
                    }
                    
                }
                if(!at(envir.ArrayCont)) {
                    envir.index = indexBefore;
                    return false;
                }
                while(at(envir.ArrayCont));
                at(envir.Call);
            }
        }
        
        debug("ConsumeStmt: found ArrayCont. envir.index:" + envir.index + ", lexeme:" + parseTokens[envir.index].lexeme);
        return true;
    }
};