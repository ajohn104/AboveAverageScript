// Exp1            ::= Exp2 ('if' Exp2 ('else' Exp2)?)?
module.exports = {
    is: function() {
        var indexBefore = index;

        if(!expect(Exp2)) {
            index = indexBefore;
            return false;
        }

        if(tokens[index].lexeme === 'if') {
            index++;
            if(!expect(Exp2)) {
                index = indexBefore;
                return false;
            }
            if(tokens[index].lexeme === 'else') {
                index++;
                if(!expect(Exp2)) {
                    index = indexBefore;
                    return false;
                }
            }
        }

        return true;
    };
};