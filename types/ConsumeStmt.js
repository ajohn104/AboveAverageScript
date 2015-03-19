// ConsumeStmt     ::= (Exp (',' Exp)*)? '<-' Id (('.' Id)* ArrayCont+ Call?)+

// ConsumeStmt     ::= (Exp (',' Exp)*)? '<-' Id ((('.' Id)? Call?)* ArrayCont)+
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;

        at(envir.Exp);

        while(at(',')) {
            if(!at(envir.Exp)) {
                envir.index = indexBefore;
                return false;
            }
        }
        debug("ConsumeStmt: checking for '<-'. envir.index:" + envir.index + ", lexeme:" + envir.parseTokens[envir.index].lexeme);
        if(!at('<-')) {
            envir.index = indexBefore;
            return false;
        }
        debug("ConsumeStmt: found '<-'. checking for Id. envir.index:" + envir.index + ", lexeme:" + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Id)) {
            envir.index = indexBefore;
            return false;
        }


        while(next('.') || next(envir.Call)) {
            if(at('.')) {
                if(!at(envir.Id)) {
                    envir.index = indexBefore;
                    return false;
                }
            } else {
                at(envir.Call);
            }
        }

        if(!at(envir.ArrayCont)) {
            envir.index = indexBefore;
            return false;
        }
        
        while(next('.') || next(envir.Call) || next(envir.ArrayCont)) {
            while(next('.') || next(envir.Call)) {
                if(at('.')) {
                    if(!at(envir.Id)) {
                        envir.index = indexBefore;
                        return false;
                    }
                } else {
                    at(envir.ArrayCont);
                }
            }
            if(!at(envir.ArrayCont)) {
                envir.index = indexBefore;
                return false;
            }
        }
        
        debug("ConsumeStmt: found ArrayCont. envir.index:" + envir.index + ", lexeme:" + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};