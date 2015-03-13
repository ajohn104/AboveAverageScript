// AssignStmt      ::= Exp (( AssignOp Exp (',' Indent NewLine Exp AssignOp Exp (',' NewLine Exp AssignOp Exp)* Dedent)? ) | ((',' Exp)* AssignOp Exp (',' Indent Newline Exp (Newline Exp)* Dedent )?) )
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;

        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }

        if(at(envir.AssignOp)) {
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
                if(!at(envir.AssignOp)) {
                    envir.index = indexBefore;
                    return false;
                }
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
                    if(!at(envir.AssignOp)) {
                        envir.index = indexBefore;
                        return false;
                    }
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

            if(!at(envir.AssignOp)) {
                envir.index = indexBefore;
                return false;
            }

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