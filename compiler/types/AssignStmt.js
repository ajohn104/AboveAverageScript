// AssignStmt      ::= Assignable (( AssignOp Exp (',' Indent NewLine Assignable AssignOp Exp (',' NewLine Assignable AssignOp Exp)* Dedent)? ) | ((',' Assignable)* AssignOp Exp (',' Indent Newline Exp (Newline Exp)* Dedent )?) )
module.exports = {
    is: function() {
        var indexBefore = index;

        if(!expect(Assignable)) {
            index = indexBefore;
            return false;
        }

        if(expect(AssignOp)) {
            if(!expect(Exp)) {
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
                if(!expect(Assignable)) {
                    index = indexBefore;
                    return false;
                }
                if(!expect(AssignOp)) {
                    index = indexBefore;
                    return false;
                }
                if(!expect(Exp)) {
                    index = indexBefore;
                    return false;
                }
                while(parseTokens[index].lexeme === ',') {
                    index++;
                    if(!expect(Newline)) {
                        index = indexBefore;
                        return false;
                    }
                    if(!expect(Assignable)) {
                        index = indexBefore;
                        return false;
                    }
                    if(!expect(AssignOp)) {
                        index = indexBefore;
                        return false;
                    }
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
        } else if(parseTokens[index].lexeme === ',') {
            while(parseTokens[index].lexeme === ',') {
                index++;
                if(!expect(Assignable)) {
                    index = indexBefore;
                    return false;
                }
            }

            if(!expect(AssignOp)) {
                index = indexBefore;
                return false;
            }

            if(!expect(Exp)) {
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
        } else {
            index = indexBefore;
            return false;
        }
        return true;
    }
};