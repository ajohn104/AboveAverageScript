// ObjectInline    ::= '{' ( Property (',' Property)* (Indent (',' Newline Property)* Dedent)? )? '}'
module.exports = {
    is: function() {
        var indexBefore = index;

        if(tokens[index].lexeme !== '{') {
            index = indexBefore;
            return false;
        }
        index++;

        if(expect(Property)) {

            while(tokens[index].lexeme === ',') {
                if(!expect(Property)) {
                    index = indexBefore;
                    return false;
                }
            }

            if(expect(Indent)) {

                while(tokens[index].lexeme === ',') {
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
        return true;
    };
};