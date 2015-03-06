// For             ::= 'for' ( ('let'? Id '=')? Exp ',')? Exp ',' Exp
module.exports = {
    is: function() {
        var indexBefore = index;

        if(parseTokens[index].lexeme !== 'for') {
            index = indexBefore;
            return false;
        } 
        index++;

        if(parseTokens[index].lexeme === 'let') {
            index++;
            if(!expect(Id)) {
                index = indexBefore;
                return false;
            }
            if(parseTokens[index].lexeme !== '=') {
                index = indexBefore;
                return false;
            }
            index++;
            if(!expect(Exp)) {
                index = indexBefore;
                return false;
            }
            if(parseTokens[index].lexeme !== ',') {
                index = indexBefore;
                return false;
            }
            index++;
        } else if(expect(Id)) {
            if(parseTokens[index].lexeme !== '=') {
                index = indexBefore;
                return false;
            }
            index++;
            if(!expect(Exp)) {
                index = indexBefore;
                return false;
            }
            if(parseTokens[index].lexeme !== ',') {
                index = indexBefore;
                return false;
            }
            index++;
        } else {
            if(parseTokens[index].lexeme !== ',') {
                index = indexBefore;
                return false;
            }
            index++;
        }

        if(!expect(Exp)) {
            index = indexBefore;
            return false;
        }
        if(parseTokens[index].lexeme !== ',') {
            index = indexBefore;
            return false;
        }
        index++;
        if(!expect(Exp)) {
            index = indexBefore;
            return false;
        }

        return true;
    }
};