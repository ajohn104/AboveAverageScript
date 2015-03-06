// Call            ::= '(' ( Exp (',' Exp)* (',' Indent Newline Exp (Newline ',' Exp)* Dedent)? ) Newline? ')'
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("Starting call test");
        if(parseTokens[index].lexeme !== '(') {
            index = indexBefore;
            return false;
        }
        index++;

        if(expect(Exp)) {
            var indexMid = index;
            if(parseTokens[index].lexeme === ',') {
                index++;
                if(expect(Exp)) {
                    indexMid = index;
                    while(parseTokens[index].lexeme === ',') {
                        index++;
                        if(!expect(Exp)) {
                            index = indexMid;
                            break;
                        }
                        indexMid = index;
                    }
                }
            }
            if(parseTokens[index].lexeme === ',') {
                index++;
                if(!expect(Indent)) {
                    index = indexBeforeIndent;
                    return false;
                }

                if(!expect(Newline)) {
                    index = indexBeforeIndent;
                    return false;
                }

                if(!expect(Exp)) {
                    index = indexBeforeIndent;
                    return false;
                }

                while(expect(Newline)) {
                    if(parseTokens[index].lexeme !== ',') {
                        index = indexBefore;
                        break;
                    }
                    index++;
                    if(!expect(Exp)) {
                        index = indexBefore;
                        break;
                    }
                }

                if(!expect(Dedent)) {
                    index = indexBefore;
                    return false;
                }
            }


        }

        if(expect(Indent)) {

            while(expect(Newline)) {
                if(parseTokens[index].lexeme !== ',') {
                    index = indexBefore;
                    break;
                }
                index++;
                if(!expect(Exp)) {
                    index = indexBefore;
                    break;
                }
            }

            if(!expect(Dedent)) {
                index = indexBefore;
                return false;
            }
        }

        expect(Newline);

        if(parseTokens[index].lexeme !== ')') {
            index = indexBefore;
            return false;
        }
        index++;
        console.log("Ending successful call");
        return true;
    }
};