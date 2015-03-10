// ObjectInline    ::= '{' (Property (',' Property)*) | (Indent Newline Property (',' Newline Property)* Dedent Newline) '}'
module.exports = {
    is: function() {
        var indexBefore = index;

        if(parseTokens[index].lexeme !== '{') {
            index = indexBefore;
            return false;
        }
        index++;

        if(expect(Property)) {
            while(parseTokens[index].lexeme === ',') {
                index++;
                if(!expect(Property)) {
                    index = indexBefore;
                    return false;
                }
            }
        } else if(expect(Indent)) {
            if(!expect(Newline)) {
                index = indexBefore;
                return false;
            }
            
            if(!expect(Property)) {
                index = indexBefore;
                return false;
            }
            while(parseTokens[index].lexeme === ',') {
                index++;
                if(!expect(Newline)) {
                    index = indexBefore;
                    return false;
                }
                if(!expect(Property)) {
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
            ; // Do nothing
        }
        if(parseTokens[index].lexeme !== '}') {
            index = indexBefore;
            return false;
        }
        index++;
        return true;
    }
};