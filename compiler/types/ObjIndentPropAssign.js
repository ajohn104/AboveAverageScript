// ObjIndentPropAssign ::= Exp ':' Indent (Newline (Property|ObjIndentPropAssign) )+ Dedent
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("ObjIndentPropAssign: checking for Exp, index: " + index );
        if(!expect(Exp)) {
            index = indexBefore;
            console.log("ObjIndentPropAssign: cannot find Exp, index: " + index );
            return false;
        }
        console.log("ObjIndentPropAssign: found Exp, index: " + index );
        console.log("ObjIndentPropAssign: checking for ':', index: " + index );
        if(parseTokens[index].lexeme !== ':') {
            index = indexBefore;
            console.log("ObjIndentPropAssign: cannot find ':', index: " + index );
            return false;
        }
        index++;
        console.log("ObjIndentPropAssign: found ':', index: " + index );
        console.log("ObjIndentPropAssign: checking for Indent, index: " + index );
        if(!expect(Indent)) {
            index = indexBefore;
            console.log("ObjIndentPropAssign: cannot find Indent, index: " + index );
            return false;
        }
        console.log("ObjIndentPropAssign: found Indent, index: " + index );
        console.log("ObjIndentPropAssign: checking for Newline, index: " + index );
        if(!expect(Newline)) {
            index = indexBefore;
            console.log("ObjIndentPropAssign: cannot find Newline, index: " + index );
            return false;
        }
        var midIndex = index;
        do {
            console.log("ObjIndentPropAssign: found Newline, index: " + index );
            console.log("ObjIndentPropAssign: checking for Property, index: " + index );
            if(expect(Property)) {
                // do nothing
                console.log("ObjIndentPropAssign: found Property, index: " + index );
            } else if(expect(ObjIndentPropAssign)) {
                // do nothing
                console.log("ObjIndentPropAssign: found ObjIndentPropAssign, index: " + index);
            } else {
                console.log("Could not find property.");
                index = midIndex;
            }
            midIndex = index;
            console.log("ObjIndentPropAssign: found Property, index: " + index );
            console.log("ObjIndentPropAssign: checking for Newline, index: " + index );
        } while(expect(Newline));
        console.log("ObjIndentPropAssign: cannot find Newline. End of properties, index: " + index );
        console.log("ObjIndentPropAssign: checking for Dedent, index: " + index );
        if(!expect(Dedent)) {
            index = indexBefore;
            console.log("ObjIndentPropAssign: cannot find Dedent, index: " + index );
            return false;
        }
        console.log("ObjIndentPropAssign: found Dedent. Completed. index: " + index );
        return true;
    }
};