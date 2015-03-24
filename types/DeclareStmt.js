// DeclareStmt     ::= 'let' (ExpList '=' (ObjInd | ExpList)) | (SetEqual (',' Indent Newline SetEqual (',' Newline SetEqual)* Dedent ) )
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;

        if(!at('let')) {
            envir.index = indexBefore;
            return false;
        } 
        debug("DeclareStmt: found 'let'. envir.index:" + envir.index);
        var found = false;
        var indexMid = envir.index;
        if(!found && at(envir.ExpList)) {
            found = true;
            if(!(at('=') && (at(envir.ObjInd) || at(envir.ExpList)))) {
                found = false;
                envir.index = indexMid;
            }
        }
        debug("DeclareStmt: found ExpList: " + found + ". envir.index:" + envir.index);

        if(!found && at(envir.SetEqual)) {
            debug("DeclareStmt: checking for SetEqual stuff. envir.index:" + envir.index);
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

        debug("DeclareStmt: passed setequal. found: " + found + ". envir.index:" + envir.index);
        if(!found) {
            envir.index = indexBefore;
            return false;
        }
        return true;
    }
};