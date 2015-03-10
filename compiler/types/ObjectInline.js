// ObjectInline    ::= '{' ( Property (',' Property)* (Indent (',' Newline Property)* Dedent)? )? '}'
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

            if(expect(Indent)) {

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
            }

        }

        if(parseTokens[index].lexeme !== '}') {
            index = indexBefore;
            return false;
        }
        index++;

        return true;
    }
};