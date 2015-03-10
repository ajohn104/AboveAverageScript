// Func            ::= 'func' (Id (',' Id)* )? '->' ('ret'? Exp) | (Indent Block? (Newline 'ret' Exp?)? Dedent)
module.exports = {
    is: function() {
        var indexBefore = index;
        debug("Beginning func testing. index:" + index);
        if(parseTokens[index].lexeme !== 'func') {
            index = indexBefore;
            return false;
        }
        index++;
        debug("Found 'func', looking for parameters. index:" + index);
        if(expect(Id)) {
            debug("Found Id. Checking for ','. index:" + index);
            while(parseTokens[index].lexeme === ',') {
                index++;
                debug("Found ','. Looking for Id. index:" + index);
                if(!expect(Id)) {
                    index = indexBefore;
                    return false;
                }
                debug("Found Id. Looking for ','. index:" + index);
            }
        }
        debug("End of parameters. Looking for '->'. index:" + index);
        if(parseTokens[index].lexeme !== '->') {
            index = indexBefore;
            return false;
        }
        index++;
        debug("Found '->'. Looking for single line 'ret'. index:" + index);
        if(parseTokens[index].lexeme === 'ret') {
            index++;
            if(!expect(Exp)) {
                index = indexBefore;
                return false;
            }
        } else if(expect(Exp)) {
            debug("Single line 'ret' not found. Instead found Single line Exp. index:" + index);
            ; // Just let it fall through
        } else {
            debug("Not single line. checking for indent. index:" + index);
            if(!expect(Indent)) {
                index = indexBefore;
                return false;
            }
            debug("Found indent. Checking for Block. index:" + index);
            expect(Block);
            debug("Done with Block search. Looking for return statement. index:" + index + ", lexeme: " + parseTokens[index].lexeme);
            var indexMid = index;
            if(parseTokens[index].kind === "Newline" && parseTokens[index+1].lexeme === 'ret') {
                index+=2;
                debug("Found newline and ret. index:" + index + ", Lexeme: " + parseTokens[index].lexeme);
                expect(Exp);
                debug("Found return statement. index:" + index);
            } else {
                debug("No newline found or 'ret' found. index:" + index + ", Lexeme: " + parseTokens[index].lexeme);
            }
            debug("Done with return statement. Looking for Dedent. index:" + index);
            if(!expect(Dedent)) {
                index = indexBefore;
                return false;
            }
            debug("Successful end of function. index:" + index + " \n");
        }
        debug("Finalizing function success. index:" + index);
        debug(parseTokens[index]);
        debug('\n');
        return true;
    }
};