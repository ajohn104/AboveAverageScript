// AssignStmt      ::= Exp (( AssignOp Exp (',' Indent NewLine Exp AssignOp Exp (',' NewLine Exp AssignOp Exp)* Dedent)? ) | ((',' Exp)* AssignOp Exp (',' Indent Newline Exp (Newline Exp)* Dedent )?) )
module.exports = {
    is: function(at, next, envir, debug) {
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
            if(at(',')) {
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
                while(at(',')) {
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
        } else if(next(',')) {
            while(at(',')) {
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

            if(at(',')) {
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