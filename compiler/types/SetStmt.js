// SetStmt      ::= Exp (( '=' Exp (',' Indent NewLine Exp '=' Exp (',' NewLine Exp '=' Exp)* Dedent)? ) | ((',' Exp)* '=' Exp (',' Indent Newline Exp (Newline Exp)* Dedent )?) )
module.exports = {
    is: function() {
        var indexBefore = index;
        debug("SetStmt: looking for first Exp. index:" + index);
        if(!expect(Exp)) {
            index = indexBefore;
            return false;
        }
        debug("SetStmt: found first Exp, looking for '='. index:" + index);
        if(parseTokens[index].lexeme === '=') {
            index++;
            debug("SetStmt: found '=', looking for Exp. index:" + index);
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
                if(parseTokens[index].lexeme !== '=') {
                    index = indexBefore;
                    return false;
                }
                index++;
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
                    if(parseTokens[index].lexeme !== '=') {
                        index = indexBefore;
                        return false;
                    }
                    index++;
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

            if(parseTokens[index].lexeme !== '=') {
                index = indexBefore;
                return false;
            }
            index++;

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