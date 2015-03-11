// Case            ::= Newline 'case' Exp18 ':' Indent Block Dedent
module.exports = {
    is: function() {
        var indexBefore = index;

        if(!expect(Newline)) {
            index = indexBefore;
            return false;
        }

        if(parseTokens[index].lexeme !== 'case') {
            index = indexBefore;
            return false;
        } 
        index++;

        if(!expect(Exp18)) {
            index = indexBefore;
            return false;
        }

        if(parseTokens[index].lexeme !== ':') {
            index = indexBefore;
            return false;
        } 
        index++;

        if(!expect(Indent)) {
            index = indexBefore;
            return false;
        }

        if(!expect(Block)) {
            index = indexBefore;
            return false;
        }

        if(!expect(Dedent)) {
            index = indexBefore;
            return false;
        }

        return true;
    }
};