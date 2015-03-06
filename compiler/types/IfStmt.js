// IfStmt          ::= 'if' Exp ':' Indent Block Dedent ('elif' ':' Exp Indent Block Dedent)* ('else' Indent Block Dedent)?
module.exports = {
    is: function() {
        var indexBefore = index;

        if(parseTokens[index].lexeme !== 'if') {
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

        while(parseTokens[index].lexeme === 'elif') {
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
        }

        if(parseTokens[index].lexeme === 'else') {
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
        }
        return true;
    }
};