// DeclareStmt     ::= 'let' SetStmt ( ',' Indent Newline SetStmt (',' Newline SetStmt)* Dedent )?
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        /*debug("looking for let");
        debug("have a:");
        debug(parseTokens[envir.index]);*/
        if(parseTokens[envir.index].lexeme !== 'let') {
            envir.index = indexBefore;
            return false;
        } 
        envir.index++;
        debug("DeclareStmt: found 'let'. envir.index:" + envir.index);

        if(!at(envir.SetStmt)) {
            envir.index = indexBefore;
            return false;
        }
        if(parseTokens[envir.index].lexeme === ',') {
            envir.index++;
            if(!at(envir.Indent)) {
                envir.index = indexBefore;
                return false;
            }
            if(!at(envir.Newline)) {
                envir.index = indexBefore;
                return false;
            }
            if(!at(envir.SetStmt)) {
                envir.index = indexBefore;
                return false;
            }
            while(parseTokens[envir.index].lexeme === ',') {
                envir.index++;
                if(!at(envir.Newline)) {
                    envir.index = indexBefore;
                    return false;
                }
                if(!at(envir.SetStmt)) {
                    envir.index = indexBefore;
                    return false;
                }
            }
            if(!at(envir.Dedent)) {
                envir.index = indexBefore;
                return false;
            }
        }
        return true;
    }
};