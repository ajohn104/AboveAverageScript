// While           ::= 'while' Exp Indent Block Dedent
module.exports = {
    is: function() {
        var indexBefore = index;

        if(tokens[index].lexeme !== 'while') {
            index = indexBefore;
            return false;
        } 
        index++;

        if(!expect(Exp)) {
            index = indexBefore;
            return false;
        }

        if(!expect(Indent)) {
            index = indexBefore;
            return false;
        }

        if(!expect(Block)) {
            index = indexBefore;
            return false;
        }

        if(!expect(Dedent)) {
            index = indexBefore;
            return false;
        }

        return true;
    };
};