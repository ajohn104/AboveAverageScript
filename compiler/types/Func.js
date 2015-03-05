// Func            ::= 'func' '(' (Id (',' Id)* )? ')' Indent Block Dedent
module.exports = {
    is: function() {
        var indexBefore = index;

        if(tokens[index].lexeme !== '(') {
            index = indexBefore;
            return false;
        }
        index++;

        if(expect(Id)) {
            while(tokens[index].lexeme !== ',') {
                index++;
                if(!expect(Id)) {
                    index = indexBefore;
                    return false;
                }
            }
        }

        if(tokens[index].lexeme !== ')') {
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

        if(!expect(Dedent)) {
            index = indexBefore;
            return false;
        }

        return true;
    };
};