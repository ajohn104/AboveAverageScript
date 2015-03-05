// Exp5            ::= Exp6 ('|' Exp6)*
module.exports = {
    is: function() {
        var indexBefore = index;

        if(!expect(Exp6)) {
            index = indexBefore;
            return false;
        }

        while(tokens[index].lexeme === '|') {
            index++;
            if(!expect(Exp6)) {
                index = indexBefore;
                return false;
            }
        }

        return true;
    };
};