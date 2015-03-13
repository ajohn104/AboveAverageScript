// ObjectInline    ::= '{' (Property (',' Property)*) | (Indent Newline Property (',' Newline Property)* Dedent Newline) '}'
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;

        if(parseTokens[envir.index].lexeme !== '{') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;

        if(at(envir.Property)) {
            while(parseTokens[envir.index].lexeme === ',') {
                envir.index++;
                if(!at(envir.Property)) {
                    envir.index = indexBefore;
                    return false;
                }
            }
        } else if(at(envir.Indent)) {
            if(!at(envir.Newline)) {
                envir.index = indexBefore;
                return false;
            }
            
            if(!at(envir.Property)) {
                envir.index = indexBefore;
                return false;
            }
            while(parseTokens[envir.index].lexeme === ',') {
                envir.index++;
                if(!at(envir.Newline)) {
                    envir.index = indexBefore;
                    return false;
                }
                if(!at(envir.Property)) {
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
            ; // Do nothing
        }
        if(parseTokens[envir.index].lexeme !== '}') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;
        return true;
    }
};