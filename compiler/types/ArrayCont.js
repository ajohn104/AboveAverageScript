// ArrayCont       ::= '[' (Exp (',' Exp)*) | (Indent Newline Exp (',' Newline? Exp)* Dedent Newline) ']'
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;

        if(parseTokens[envir.index].lexeme !== '[') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;

        if(at(envir.Exp)) {
            while(parseTokens[envir.index].lexeme === ',') {
                envir.index++;
                if(!at(envir.Exp)) {
                    envir.index = indexBefore;
                    return false;
                }
            }
        } else if(at(envir.Indent)) {
            if(!at(envir.Newline)) {
                envir.index = indexBefore;
                return false;
            }
            
            if(!at(envir.Exp)) {
                envir.index = indexBefore;
                return false;
            }
            while(parseTokens[envir.index].lexeme === ',') {
                envir.index++;
                at(envir.Newline);
                if(!at(envir.Exp)) {
                    envir.index = indexBefore;
                    return false;
                }
            }
            if(!at(envir.Dedent)) {
                envir.index = indexBefore;
                return false;
            }

            if(!at(envir.Newline)) {
                envir.index = indexBefore;
                return false;
            }
        } else {
            envir.index = indexBefore;
            return false;
        }
        if(parseTokens[envir.index].lexeme !== ']') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;
        return true;
    }
};