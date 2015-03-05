// SetStmt         ::= Assignable (',' Assignable)* '=' Exp (',' Indent Newline Exp (Newline Exp)* Dedent )?
module.exports = {
    is: function() {
        var indexBefore = index;

        if(!expect(Assignable)) {
            index = indexBefore;
            return false;
        }

        while(tokens[index].lexeme === ',') {
            index++;
            if(!expect(Assignable)) {
                index = indexBefore;
                return false;
            }
        }

        if(tokens[index].lexeme !== '=') {
            index = indexBefore;
            return false;
        }
        index++;

        if(!expect(Exp)) {
            index = indexBefore;
            return false;
        }

        if(tokens[index].lexeme === ',') {
            index++;
            if(!expect(Indent)) {
                index = indexBefore;
                return false;
            }
            if(!expect(Newline)) {
                index = indexBefore;
                return false;
            }
            if(!expect(Exp)) {
                index = indexBefore;
                return false;
            }
            while(expect(Newline)) {
                if(!expect(Exp)) {
                    index = indexBefore;
                    return false;
                }
            }
            if(!expect(Dedent)) {
                index = indexBefore;
                return false;
            }
        }
        return true;
    };
};