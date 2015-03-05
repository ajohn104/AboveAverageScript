// Exp4            ::= Exp5 ('and' Exp5)*
module.exports = {
    is: function() {
        var indexBefore = index;

        if(!expect(Exp5)) {
            index = indexBefore;
            return false;
        }

        while(tokens[index].lexeme === 'and') {
            index++;
            if(!expect(Exp5)) {
                index = indexBefore;
                return false;
            }
        }

        return true;
    };
};