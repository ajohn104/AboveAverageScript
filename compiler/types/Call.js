// Call            ::= '(' ( Exp(',' Exp)?)* (Indent (Newline ',' Exp)* Dedent)? ')'
module.exports = {
    is: function() {
        var indexBefore = index;

        if(tokens[index].lexeme !== '(') {
            index = indexBefore;
            return false;
        }
        index++;

        while(expect(Exp)) {
            if(tokens[index].lexeme === ',') {
                index++;
                if(expect(Exp)) {
                    index = indexBefore;
                    return false;
                }
            }
        }

        if(expect(Indent)) {

            while(expect(Newline)) {
                if(tokens[index].lexeme !== ',') {
                    index = indexBefore;
                    return false;
                }
                index++;
                if(expect(Exp)) {
                    index = indexBefore;
                    return false;
                }
            }

            if(expect(Dedent)) {
                index = indexBefore;
                return false;
            }
        }

        if(tokens[index].lexeme !== ')') {
            index = indexBefore;
            return false;
        }
        index++;

        return true;
    };
};