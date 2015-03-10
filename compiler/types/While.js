// While           ::= 'while' Exp ':' Indent Block Dedent
module.exports = {
    is: function() {
        var indexBefore = index;
        debug("Checking for while loop");
        if(parseTokens[index].lexeme !== 'while') {
            index = indexBefore;
            return false;
        } 
        index++;

        if(!expect(Exp)) {
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