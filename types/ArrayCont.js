// ArrayCont       ::= '[' (Exp (',' Exp)*) | (Indent Newline Exp (',' Newline? Exp)* Dedent Newline) Newline? ']'
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;

        if(!at('[')) {
            envir.index = indexBefore;
            return false;
        }

        if(at(envir.Exp)) {
            while(at(',')) {
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
            while(at(',')) {
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
        at(envir.Newline);
        if(!at(']')) {
            envir.index = indexBefore;
            return false;
        }
        return true;
    }
};