// Exp3            ::= Exp4 ('or' Exp4)*
module.exports = {
    is: function() {
        var indexBefore = index;

        if(!expect(Exp4)) {
            index = indexBefore;
            return false;
        }

        while(tokens[index].lexeme === 'or') {
            index++;
            if(!expect(Exp4)) {
                index = indexBefore;
                return false;
            }
        }

        return true;
    };
};