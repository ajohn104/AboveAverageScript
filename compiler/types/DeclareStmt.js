// DeclareStmt     ::= 'let' SetStmt ( ',' Indent Newline SetStmt (',' Newline SetStmt)* Dedent )?
module.exports = {
    is: function() {
        var indexBefore = index;

        if(tokens[index].lexeme !== 'let') {
            index = indexBefore;
            return false;
        } 
        index++;

        if(!expect(SetStmt)) {
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
            if(!expect(SetStmt)) {
                index = indexBefore;
                return false;
            }
            while(tokens[index].lexeme === ',') {
                index++;
                if(!expect(Newline)) {
                    index = indexBefore;
                    return false;
                }
                if(!expect(SetStmt)) {
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