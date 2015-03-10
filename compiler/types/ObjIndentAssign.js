// ObjIndentAssign ::= Exp '=' Indent (Newline (Property|ObjIndentPropAssign) )+ Dedent
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("ObjIndentAssign: checking for Exp, index: " + index );
        if(!expect(Exp)) {
            index = indexBefore;
            console.log("ObjIndentAssign: cannot find Exp, index: " + index );
            return false;
        }
        console.log("ObjIndentAssign: found Exp, index: " + index );
        console.log("ObjIndentAssign: checking for '=', index: " + index );
        if(parseTokens[index].lexeme !== '=') {
            index = indexBefore;
            console.log("ObjIndentAssign: cannot find '=', index: " + index );
            return false;
        }
        index++;
        console.log("ObjIndentAssign: found '=', index: " + index );
        console.log("ObjIndentAssign: checking for Indent, index: " + index );
        if(!expect(Indent)) {
            index = indexBefore;
            console.log("ObjIndentAssign: cannot find Indent, index: " + index );
            return false;
        }
        console.log("ObjIndentAssign: found Indent, index: " + index );
        console.log("ObjIndentAssign: checking for Newline, index: " + index );
        if(!expect(Newline)) {
            index = indexBefore;
            console.log("ObjIndentAssign: cannot find Newline, index: " + index );
            return false;
        }
        var midIndex = index;
        do {
            console.log("ObjIndentAssign: found Newline, index: " + index );
            console.log("ObjIndentAssign: checking for Property, index: " + index );
            if(expect(Property)) {
                // do nothing
                console.log("ObjIndentAssign: found Property, index: " + index );
            } else if(expect(ObjIndentPropAssign)) {
                // do nothing
                console.log("ObjIndentAssign: found ObjIndentPropAssign, index: " + index);
            } else {
                console.log("Could not find property.");
                index = midIndex;
            }
            midIndex = index;
            console.log("ObjIndentAssign: found Property, index: " + index );
            console.log("ObjIndentAssign: checking for Newline, index: " + index );
        } while(expect(Newline));
        console.log("ObjIndentAssign: cannot find Newline. End of properties, index: " + index );
        console.log("ObjIndentAssign: checking for Dedent, index: " + index );
        if(!expect(Dedent)) {
            index = indexBefore;
            console.log("ObjIndentAssign: cannot find Dedent, index: " + index );
            return false;
        }
        console.log("ObjIndentAssign: found Dedent. Completed. index: " + index );
        return true;
    }
};