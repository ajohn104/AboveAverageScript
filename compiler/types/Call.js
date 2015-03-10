// Call            ::= '(' ( Exp (',' Exp)* (',' Indent Newline Exp (Newline ',' Exp)* Dedent)? )? Newline? ')'
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
                    index = indexMid;
                    return false;
                }

                if(!expect(Newline)) {
                    index = indexMid;
                    return false;
                }

                if(!expect(Exp)) {
                    index = indexMid;
                    return false;
                }

                while(parseTokens[index].kind === "Newline" && parseTokens[index+1].lexeme === ",") {
                    index+=2;
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
            console.log("Cannot find any arguments to function. Checking for ')'. index:" + index);
        }

        /*if(expect(Indent)) {

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
        }*/

        expect(Newline);

        if(parseTokens[index].lexeme !== ')') {
            index = indexBefore;
            return false;
        }
        index++;
        console.log("Ending successful call on function: " + parseTokens[indexBefore-1].lexeme);
        return true;
    }
};