// SetStmt      ::= Exp (( '=' Exp (',' Indent NewLine Exp '=' Exp (',' NewLine Exp '=' Exp)* Dedent)? ) | ((',' Exp)* '=' Exp (',' Indent Newline Exp (Newline Exp)* Dedent )?) )
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        debug("SetStmt: looking for first Exp. index:" + envir.index);
        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }
        debug("SetStmt: found first Exp, looking for '='. index:" + envir.index);
        if(parseTokens[envir.index].lexeme === '=') {
            envir.index++;
            debug("SetStmt: found '=', looking for Exp. index:" + envir.index);
            if(!at(envir.Exp)) {
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
                if(!at(envir.Exp)) {
                    envir.index = indexBefore;
                    return false;
                }
                if(parseTokens[envir.index].lexeme !== '=') {
                    envir.index = indexBefore;
                    return false;
                }
                envir.index++;
                if(!at(envir.Exp)) {
                    envir.index = indexBefore;
                    return false;
                }
                while(parseTokens[envir.index].lexeme === ',') {
                    envir.index++;
                    if(!at(envir.Newline)) {
                        envir.index = indexBefore;
                        return false;
                    }
                    if(!at(envir.Exp)) {
                        envir.index = indexBefore;
                        return false;
                    }
                    if(parseTokens[envir.index].lexeme !== '=') {
                        envir.index = indexBefore;
                        return false;
                    }
                    envir.index++;
                    if(!at(envir.Exp)) {
                        envir.index = indexBefore;
                        return false;
                    }
                }
                if(!at(envir.Dedent)) {
                    envir.index = indexBefore;
                    return false;
                }
            }
        } else if(parseTokens[envir.index].lexeme === ',') {
            while(parseTokens[envir.index].lexeme === ',') {
                envir.index++;
                if(!at(envir.Exp)) {
                    envir.index = indexBefore;
                    return false;
                }
            }

            if(parseTokens[envir.index].lexeme !== '=') {
                envir.index = indexBefore;
                return false;
            }
            envir.index++;

            if(!at(envir.Exp)) {
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
                if(!at(envir.Exp)) {
                    envir.index = indexBefore;
                    return false;
                }
                while(at(envir.Newline)) {
                    if(!at(envir.Exp)) {
                        envir.index = indexBefore;
                        return false;
                    }
                }
                if(!at(envir.Dedent)) {
                    envir.index = indexBefore;
                    return false;
                }
            }
        } else {
            envir.index = indexBefore;
            return false;
        }
        return true;
    }
};