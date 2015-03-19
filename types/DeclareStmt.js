// DeclareStmt     ::= 'let' SetStmt ( ',' Indent Newline SetStmt (',' Newline SetStmt)* Dedent )?
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;

        if(!at('let')) {
            envir.index = indexBefore;
            return false;
        } 
        debug("DeclareStmt: found 'let'. envir.index:" + envir.index);

        if(!at(envir.SetStmt)) {
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
            if(!at(envir.SetStmt)) {
                envir.index = indexBefore;
                return false;
            }
            while(at(',')) {
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

// DeclareStmt     ::= 'let' (ExpList '=' (ObjInd | ExpList)) | (SetEqual (',' Indent Newline SetEqual (',' Newline SetEqual)* Dedent ) )
/*module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;

        if(!at('let')) {
            envir.index = indexBefore;
            return false;
        } 
        debug("DeclareStmt: found 'let'. envir.index:" + envir.index);

        if(!at(envir.SetStmt)) {
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
            if(!at(envir.SetStmt)) {
                envir.index = indexBefore;
                return false;
            }
            while(at(',')) {
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
};*/