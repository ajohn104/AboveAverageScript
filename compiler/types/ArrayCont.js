// ArrayCont       ::= '[' (Exp (',' Exp)*) | (Indent Newline Exp (',' Newline? Exp)* Dedent Newline) ']'
module.exports = {
    is: function() {
        var indexBefore = index;

        if(parseTokens[index].lexeme !== '[') {
            index = indexBefore;
            return false;
        }
        index++;

        if(expect(Exp)) {
            while(parseTokens[index].lexeme === ',') {
                index++;
                if(!expect(Exp)) {
                    index = indexBefore;
                    return false;
                }
            }
        } else if(expect(Indent)) {
            if(!expect(Newline)) {
                index = indexBefore;
                return false;
            }
            
            if(!expect(Exp)) {
                index = indexBefore;
                return false;
            }
            while(parseTokens[index].lexeme === ',') {
                index++;
                expect(Newline);
                if(!expect(Exp)) {
                    index = indexBefore;
                    return false;
                }
            }
            if(!expect(Dedent)) {
                index = indexBefore;
                return false;
            }

            if(!expect(Newline)) {
                index = indexBefore;
                return false;
            }
        } else {
            index = indexBefore;
            return false;
        }
        if(parseTokens[index].lexeme !== ']') {
            index = indexBefore;
            return false;
        }
        index++;
        return true;
    }
};