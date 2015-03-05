// ForIn           ::= 'for' Id (',' Id)? 'in' Exp
module.exports = {
    is: function() {
        var indexBefore = index;

        if(tokens[index].lexeme !== 'for') {
            index = indexBefore;
            return false;
        } 
        index++;

        if(!expect(Id)) {
            index = indexBefore;
            return false;
        }

        if(tokens[index].lexeme === ',') {
            index++;
            if(!expect(Id)) {
                index = indexBefore;
                return false;
            }
        }

        if(tokens[index].lexeme !== 'in') {
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