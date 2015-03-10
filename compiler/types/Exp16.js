// Exp16           ::= Exp17 (ArrayCont Call?)* ( ('.' Exp16 Call?)* | (Indent (Newline '.' Exp16 Call?)+ Dedent)) )?
module.exports = {
    is: function() {
        var indexBefore = index;
        debug("Starting on exp16. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(!expect(Exp17)) {
            index = indexBefore;
            return false;
        }

        while(expect(ArrayCont)) {
            expect(Call);
        }

        if(parseTokens[index].lexeme === '.') {
            while(parseTokens[index].lexeme === '.') {
                debug("Exp16: found '.' operator. index:" + index);
                index++;
                if(!expect(Exp16)) {
                    index = indexBefore;
                    return false;
                }
                expect(Call);
            }
        } else if(expect(Indent)) {
            debug("Exp16: found Indent. index:" + index);
            if(parseTokens[index].lexeme !== '\\n' || parseTokens[index+1].lexeme !== '.') {
                index = indexBefore;
                return false;
            }
            while(parseTokens[index].lexeme === '\\n' && parseTokens[index+1].lexeme === '.') {
                index+=2;
                debug("Exp16: found Newline and '.' operator. index:" + index + ", lexeme: " + parseTokens[index].lexeme);
                if(!expect(Exp16)) {
                    index = indexBefore;
                    return false;
                }
                expect(Call);
            }
            if(!expect(Dedent)) {
                index = indexBefore;
                return false;
            }
        }
        /*var isArrCont = function() {
            var indexMid = index;
            if(!expect(ArrayCont)) {
                index = indexMid;
                return false;
            }
            expect(Call);
            return true;
        };
        var isOneLineProp = function() {
            var indexMid = index;
            if(parseTokens[index].lexeme !== '.') return false;
            while(parseTokens[index].lexeme === '.') {
                index++;
                if(!expect(Exp17)) {
                    index = indexMid;
                    return false;
                }
                expect(Call);
            }
            return true;
        };
        var isIndentProps = function() {
            var indexMid = index;
            if(!expect(Indent)) {
                index = indexMid;
                return false;
            }
            if(parseTokens[index].lexeme !== "\\n" || parseTokens[index+1].lexeme !== '.') {
                index = indexMid;
                return false;
            }
            while(expect(Newline) && parseTokens[index].lexeme === '.') {
                index++;
                if(!expect(Exp17)) {
                    index = indexMid;
                    return false;
                }
                expect(Call);
            }
            if(!expect(Dedent)) {
                index = indexMid;
                return false;
            }
            return true;
        };
        while(isArrCont() || isOneLineProp() || isIndentProps());*/
        
        debug("Finalizing exp16 success. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        return true;
    }
};