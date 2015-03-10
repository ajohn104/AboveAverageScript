// AssignStmt      ::= Exp (( AssignOp Exp (',' Indent NewLine Exp AssignOp Exp (',' NewLine Exp AssignOp Exp)* Dedent)? ) | ((',' Exp)* AssignOp Exp (',' Indent Newline Exp (Newline Exp)* Dedent )?) )
module.exports = {
    is: function() {
        var indexBefore = index;

        if(!expect(Exp)) {
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
                if(!expect(Exp)) {
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
                    if(!expect(Exp)) {
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
                if(!expect(Exp)) {
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