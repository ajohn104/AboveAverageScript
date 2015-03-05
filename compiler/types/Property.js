// Property        ::= (Id | BoolLit | StringLit) ':' Exp
module.exports = {
    is: function() {
        var indexBefore = index;
        if(!expect(Id) && !expect(BoolLit) && !expect(StringLit)) {
            index = indexBefore;
            return false;
        }

        if(tokens[index].lexeme !== ':') {
            index = indexBefore;
            return false;
        }
        index++;

        if(!expect(Exp)) {
            index = indexBefore;
            return false;
        }

        return true;
    };
};