// AssignStmt      ::= Exp (( AssignOp Exp (',' Indent NewLine Exp AssignOp Exp (',' NewLine Exp AssignOp Exp)* Dedent)? ) | ((',' Exp)* AssignOp Exp (',' Indent Newline Exp (Newline Exp)* Dedent )?) )
/*module.exports = {
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
};*/

// AssignStmt      ::= (ExpList AssignOp (ObjInd | ExpList)) | (SetAssign (',' Indent Newline SetAssign (',' Newline SetAssign)* Dedent ) )
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;

        var found = false;
        var indexMid = envir.index;
        if(!found && at(envir.ExpList)) {
            found = true;
            if(!(at(envir.AssignOp) && (at(envir.ObjInd) || at(envir.ExpList)))) {
                found = false;
                envir.index = indexMid;
            }
        }

        if(!found && at(envir.SetEqual)) {
            found = true;
            if(found && !at(',')) {
                found = false;
                envir.index = indexMid;
            }
            if(found && !at(envir.Indent)) {
                found = false;
                envir.index = indexMid;
            }
            if(found && !at(envir.Newline)) {
                found = false;
                envir.index = indexMid;
            }
            if(found && !at(envir.SetEqual)) {
                found = false;
                envir.index = indexMid;
            }
            indexMid = envir.index;
            while(found && at(',') && at(envir.Newline) && at(envir.SetEqual)) {
                indexMid = envir.index;
            }
            envir.index = indexMid;

            if(!at(envir.Dedent)){
                found = false;
                envir.index = indexMid;
            }
        }
        if(!found) {
            envir.index = indexBefore;
            return false;
        }
        return true;
    }
};