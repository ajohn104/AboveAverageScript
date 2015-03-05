// DoWhile         ::= 'do' Indent Block Dedent Newline 'while' Exp
module.exports = {
    is: function() {
        var indexBefore = index;

        if(tokens[index].lexeme !== 'do') {
            index = indexBefore;
            return false;
        } 
        index++;

        if(!expect(Indent)) {
            index = indexBefore;
            return false;
        }

        if(!expect(Block)) {
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

        if(!expect(Newline)) {
            index = indexBefore;
            return false;
        }

        if(tokens[index].lexeme !== 'while') {
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