// Exp7            ::= Exp8 ('&' Exp8)*
module.exports = {
    is: function() {
        var indexBefore = index;

        if(!expect(Exp8)) {
            index = indexBefore;
            return false;
        }

        while(tokens[index].lexeme === '&')) {
            index++;
            if(!expect(Exp8)) {
                index = indexBefore;
                return false;
            }
        }

        return true;
    };
};