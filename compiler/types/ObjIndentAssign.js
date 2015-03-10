// ObjIndentAssign ::= Exp '=' Indent (Newline (Property|ObjIndentPropAssign) )+ Dedent
module.exports = {
    is: function() {
        var indexBefore = index;
        debug("ObjIndentAssign: checking for Exp, index: " + index );
        if(!expect(Exp)) {
            index = indexBefore;
            debug("ObjIndentAssign: cannot find Exp, index: " + index );
            return false;
        }
        debug("ObjIndentAssign: found Exp, index: " + index );
        debug("ObjIndentAssign: checking for '=', index: " + index );
        if(parseTokens[index].lexeme !== '=') {
            index = indexBefore;
            debug("ObjIndentAssign: cannot find '=', index: " + index );
            return false;
        }
        index++;
        debug("ObjIndentAssign: found '=', index: " + index );
        debug("ObjIndentAssign: checking for Indent, index: " + index );
        if(!expect(Indent)) {
            index = indexBefore;
            debug("ObjIndentAssign: cannot find Indent, index: " + index );
            return false;
        }
        debug("ObjIndentAssign: found Indent, index: " + index );
        debug("ObjIndentAssign: checking for Newline, index: " + index );
        if(!expect(Newline)) {
            index = indexBefore;
            debug("ObjIndentAssign: cannot find Newline, index: " + index );
            return false;
        }
        var midIndex = index;
        do {
            debug("ObjIndentAssign: found Newline, index: " + index );
            debug("ObjIndentAssign: checking for Property, index: " + index );
            if(expect(Property)) {
                // do nothing
                debug("ObjIndentAssign: found Property, index: " + index );
            } else if(expect(ObjIndentPropAssign)) {
                // do nothing
                debug("ObjIndentAssign: found ObjIndentPropAssign, index: " + index);
            } else {
                debug("Could not find property.");
                index = midIndex;
            }
            midIndex = index;
            debug("ObjIndentAssign: found Property, index: " + index );
            debug("ObjIndentAssign: checking for Newline, index: " + index );
        } while(expect(Newline));
        debug("ObjIndentAssign: cannot find Newline. End of properties, index: " + index );
        debug("ObjIndentAssign: checking for Dedent, index: " + index );
        if(!expect(Dedent)) {
            index = indexBefore;
            debug("ObjIndentAssign: cannot find Dedent, index: " + index );
            return false;
        }
        debug("ObjIndentAssign: found Dedent. Completed. index: " + index );
        return true;
    }
};