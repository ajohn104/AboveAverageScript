// ObjIndentPropAssign ::= Exp ':' Indent (Newline (Property|ObjIndentPropAssign) )+ Dedent
module.exports = {
    is: function() {
        var indexBefore = index;
        debug("ObjIndentPropAssign: checking for Exp, index: " + index );
        if(!expect(Exp)) {
            index = indexBefore;
            debug("ObjIndentPropAssign: cannot find Exp, index: " + index );
            return false;
        }
        debug("ObjIndentPropAssign: found Exp, index: " + index );
        debug("ObjIndentPropAssign: checking for ':', index: " + index );
        if(parseTokens[index].lexeme !== ':') {
            index = indexBefore;
            debug("ObjIndentPropAssign: cannot find ':', index: " + index );
            return false;
        }
        index++;
        debug("ObjIndentPropAssign: found ':', index: " + index );
        debug("ObjIndentPropAssign: checking for Indent, index: " + index );
        if(!expect(Indent)) {
            index = indexBefore;
            debug("ObjIndentPropAssign: cannot find Indent, index: " + index );
            return false;
        }
        debug("ObjIndentPropAssign: found Indent, index: " + index );
        debug("ObjIndentPropAssign: checking for Newline, index: " + index );
        if(!expect(Newline)) {
            index = indexBefore;
            debug("ObjIndentPropAssign: cannot find Newline, index: " + index );
            return false;
        }
        var midIndex = index;
        do {
            debug("ObjIndentPropAssign: found Newline, index: " + index );
            debug("ObjIndentPropAssign: checking for Property, index: " + index );
            if(expect(Property)) {
                // do nothing
                debug("ObjIndentPropAssign: found Property, index: " + index );
            } else if(expect(ObjIndentPropAssign)) {
                // do nothing
                debug("ObjIndentPropAssign: found ObjIndentPropAssign, index: " + index);
            } else {
                debug("Could not find property.");
                index = midIndex;
            }
            midIndex = index;
            debug("ObjIndentPropAssign: found Property, index: " + index );
            debug("ObjIndentPropAssign: checking for Newline, index: " + index );
        } while(expect(Newline));
        debug("ObjIndentPropAssign: cannot find Newline. End of properties, index: " + index );
        debug("ObjIndentPropAssign: checking for Dedent, index: " + index );
        if(!expect(Dedent)) {
            index = indexBefore;
            debug("ObjIndentPropAssign: cannot find Dedent, index: " + index );
            return false;
        }
        debug("ObjIndentPropAssign: found Dedent. Completed. index: " + index );
        return true;
    }
};