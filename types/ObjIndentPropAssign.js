// ObjIndentPropAssign ::= Exp ':' Indent (Newline (Property|ObjIndentPropAssign) )+ Dedent
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        debug("ObjIndentPropAssign: checking for Exp, envir.index: " + envir.index );
        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            debug("ObjIndentPropAssign: cannot find Exp, envir.index: " + envir.index );
            return false;
        }
        debug("ObjIndentPropAssign: found Exp, envir.index: " + envir.index );
        debug("ObjIndentPropAssign: checking for ':', envir.index: " + envir.index );
        if(parseTokens[envir.index].lexeme !== ':') {
            envir.index = indexBefore;
            debug("ObjIndentPropAssign: cannot find ':', envir.index: " + envir.index );
            return false;
        }
        envir.index++;
        debug("ObjIndentPropAssign: found ':', envir.index: " + envir.index );
        debug("ObjIndentPropAssign: checking for Indent, envir.index: " + envir.index );
        if(!at(envir.Indent)) {
            envir.index = indexBefore;
            debug("ObjIndentPropAssign: cannot find Indent, envir.index: " + envir.index );
            return false;
        }
        debug("ObjIndentPropAssign: found Indent, envir.index: " + envir.index );
        debug("ObjIndentPropAssign: checking for Newline, envir.index: " + envir.index );
        if(!at(envir.Newline)) {
            envir.index = indexBefore;
            debug("ObjIndentPropAssign: cannot find Newline, envir.index: " + envir.index );
            return false;
        }
        var midIndex = envir.index;
        do {
            debug("ObjIndentPropAssign: found Newline, envir.index: " + envir.index );
            debug("ObjIndentPropAssign: checking for Property, envir.index: " + envir.index );
            if(at(envir.Property)) {
                // do nothing
                debug("ObjIndentPropAssign: found Property, envir.index: " + envir.index );
            } else if(at(envir.ObjIndentPropAssign)) {
                // do nothing
                debug("ObjIndentPropAssign: found ObjIndentPropAssign, envir.index: " + envir.index);
            } else {
                debug("Could not find property.");
                envir.index = midIndex;
            }
            midIndex = envir.index;
            debug("ObjIndentPropAssign: found Property, envir.index: " + envir.index );
            debug("ObjIndentPropAssign: checking for Newline, envir.index: " + envir.index );
        } while(at(envir.Newline));
        debug("ObjIndentPropAssign: cannot find Newline. End of properties, envir.index: " + envir.index );
        debug("ObjIndentPropAssign: checking for Dedent, envir.index: " + envir.index );
        if(!at(envir.Dedent)) {
            envir.index = indexBefore;
            debug("ObjIndentPropAssign: cannot find Dedent, envir.index: " + envir.index );
            return false;
        }
        debug("ObjIndentPropAssign: found Dedent. Completed. envir.index: " + envir.index );
        return true;
    }
};