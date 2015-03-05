// Exp6            ::= Exp7 ('^' Exp7)*
module.exports = {
    is: function() {
        var indexBefore = index;

        if(!expect(Exp7)) {
            index = indexBefore;
            return false;
        }

        while(tokens[index].lexeme === '^') {
            index++;
            if(!expect(Exp7)) {
                index = indexBefore;
                return false;
            }
        }

        return true;
    };
};