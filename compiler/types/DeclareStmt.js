// DeclareStmt     ::= 'let' SetStmt ( ',' Indent Newline SetStmt (',' Newline SetStmt)* Dedent )?
module.exports = {
    is: function() {
        var indexBefore = index;
        /*debug("looking for let");
        debug("have a:");
        debug(parseTokens[index]);*/
        if(parseTokens[index].lexeme !== 'let') {
            index = indexBefore;
            return false;
        } 
        index++;
        debug("DeclareStmt: found 'let'. index:" + index);

        if(!expect(SetStmt)) {
            index = indexBefore;
            return false;
        }
        if(parseTokens[index].lexeme === ',') {
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
            while(parseTokens[index].lexeme === ',') {
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
    }
};