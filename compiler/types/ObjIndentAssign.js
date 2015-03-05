// ObjIndentAssign ::= Id '=' Indent (Newline Property)+ Dedent
module.exports = {
    is: function() {
        var indexBefore = index;

        if(!expect(Id)) {
            index = indexBefore;
            return false;
        }

        if(tokens[index].lexeme !== '=') {
            index = indexBefore;
            return false;
        }
        index++;

        if(!expect(Indent)) {
            index = indexBefore;
            return false;
        }

        if(!expect(Newline)) {
            index = indexBefore;
            return false;
        }
        do {
            if(!expect(Property)) {
                index = indexBefore;
                return false;
            }
        } while(expect(Newline));

        if(!expect(Dedent)) {
            index = indexBefore;
            return false;
        }

        return true;
    };
};