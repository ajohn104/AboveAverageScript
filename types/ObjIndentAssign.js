// ObjIndentAssign ::= Exp '=' Indent (Newline (Property|ObjIndentPropAssign) )+ Dedent
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        debug("ObjIndentAssign: checking for Exp, envir.index: " + envir.index );
        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            debug("ObjIndentAssign: cannot find Exp, envir.index: " + envir.index );
            return false;
        }
        debug("ObjIndentAssign: found Exp, envir.index: " + envir.index );
        debug("ObjIndentAssign: checking for '=', envir.index: " + envir.index );
        if(!at('=')) {
            envir.index = indexBefore;
            debug("ObjIndentAssign: cannot find '=', envir.index: " + envir.index );
            return false;
        }
        debug("ObjIndentAssign: found '=', envir.index: " + envir.index );
        debug("ObjIndentAssign: checking for Indent, envir.index: " + envir.index );
        if(!at(envir.Indent)) {
            envir.index = indexBefore;
            debug("ObjIndentAssign: cannot find Indent, envir.index: " + envir.index );
            return false;
        }
        debug("ObjIndentAssign: found Indent, envir.index: " + envir.index );
        debug("ObjIndentAssign: checking for Newline, envir.index: " + envir.index );
        if(!at(envir.Newline)) {
            envir.index = indexBefore;
            debug("ObjIndentAssign: cannot find Newline, envir.index: " + envir.index );
            return false;
        }
        var midIndex = envir.index;
        do {
            debug("ObjIndentAssign: found Newline, envir.index: " + envir.index );
            debug("ObjIndentAssign: checking for Property, envir.index: " + envir.index );
            if(at(envir.Property)) {
                // do nothing
                debug("ObjIndentAssign: found Property, envir.index: " + envir.index );
            } else if(at(envir.ObjIndentPropAssign)) {
                // do nothing
                debug("ObjIndentAssign: found ObjIndentPropAssign, envir.index: " + envir.index);
            } else {
                debug("Could not find property.");
                envir.index = midIndex;
                break;
            }
            midIndex = envir.index;
            debug("ObjIndentAssign: found Property, envir.index: " + envir.index );
            debug("ObjIndentAssign: checking for Newline, envir.index: " + envir.index );
        } while(at(envir.Newline));
        debug("ObjIndentAssign: cannot find Newline. End of properties, envir.index: " + envir.index );
        debug("ObjIndentAssign: checking for Dedent, envir.index: " + envir.index );
        if(!at(envir.Dedent)) {
            envir.index = indexBefore;
            debug("ObjIndentAssign: cannot find Dedent, envir.index: " + envir.index );
            return false;
        }
        debug("ObjIndentAssign: found Dedent. Completed. envir.index: " + envir.index );
        return true;
    }
};