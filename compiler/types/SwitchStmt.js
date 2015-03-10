// SwitchStmt      ::= 'switch' Exp ':' Indent Case+ Dedent
module.exports = {
    is: function() {
        var indexBefore = index;

        if(parseTokens[index].lexeme !== 'switch') {
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

        if(!expect(Case)) {
            index = indexBefore;
            return false;
        }

        while(expect(Case));

        if(!expect(Dedent)) {
            index = indexBefore;
            return false;
        }

        return true;
    }
};