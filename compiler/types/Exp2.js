// Exp2            ::= (Exp3 '?' Exp3 ':')? Exp3
module.exports = {
    is: function() {
        var indexBefore = index;

        if(expect(Exp3)) {
            if(tokens[index].lexeme === '?') {
                index++;
                if(!expect(Exp3)) {
                    index = indexBefore;
                    return false;
                }
                if(tokens[index].lexeme !== ':') {
                    index = indexBefore;
                    return false;
                }
                index++;
            } else {
                index = indexBefore;
            }
        }
        if(!expect(Exp3)) {
            index = indexBefore;
            return false;
        }

        return true;
    };
};