// Exp16           ::= Exp17 Call? (ArrayCont Call?)* ( ('.' Exp16)* | (Indent (Newline '.' Exp16)+ Dedent)) )?
module.exports = {
    is: function() {
        var indexBefore = index;
        debug("Starting on exp16. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(!expect(Exp17)) {
            index = indexBefore;
            return false;
        }

        expect(Call);

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
            }
            if(!expect(Dedent)) {
                index = indexBefore;
                return false;
            }
        }        
        debug("Finalizing exp16 success. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        return true;
    }
};