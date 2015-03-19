// ObjectInline    ::= '{' (Property (',' Property)*) | (Indent Newline Property (',' Newline Property)* Dedent Newline) '}'
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;

        if(!at('{')) {
            envir.index = indexBefore;
            return false;
        }

        if(at(envir.Property)) {
            while(at(',')) {
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
            while(at(',')) {
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
        if(!at('}')) {
            envir.index = indexBefore;
            return false;
        }
        return true;
    }
};