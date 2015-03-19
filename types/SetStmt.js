// SetStmt      ::= Exp (( '=' Exp (',' Indent NewLine Exp '=' Exp (',' NewLine Exp '=' Exp)* Dedent)? ) | ((',' Exp)* '=' Exp (',' Indent Newline Exp (Newline Exp)* Dedent )?) )
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        debug("SetStmt: looking for first Exp. index:" + envir.index);
        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }
        debug("SetStmt: found first Exp, looking for '='. index:" + envir.index);
        if(at('=')) {
            debug("SetStmt: found '=', looking for Exp. index:" + envir.index);
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
                if(!at('=')) {
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
                    if(!at('=')) {
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

            if(!at('=')) {
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