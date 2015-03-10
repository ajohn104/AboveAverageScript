// Func            ::= 'func' (Id (',' Id)* )? '->' ('ret'? Exp) | (Indent Block? (Newline 'ret' Exp?)? Dedent)
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("Beginning func testing. index:" + index);
        if(parseTokens[index].lexeme !== 'func') {
            index = indexBefore;
            return false;
        }
        index++;
        console.log("Found 'func', looking for parameters. index:" + index);
        if(expect(Id)) {
            console.log("Found Id. Checking for ','. index:" + index);
            while(parseTokens[index].lexeme === ',') {
                index++;
                console.log("Found ','. Looking for Id. index:" + index);
                if(!expect(Id)) {
                    index = indexBefore;
                    return false;
                }
                console.log("Found Id. Looking for ','. index:" + index);
            }
        }
        console.log("End of parameters. Looking for '->'. index:" + index);
        if(parseTokens[index].lexeme !== '->') {
            index = indexBefore;
            return false;
        }
        index++;
        console.log("Found '->'. Looking for single line 'ret'. index:" + index);
        if(parseTokens[index].lexeme === 'ret') {
            index++;
            if(!expect(Exp)) {
                index = indexBefore;
                return false;
            }
        } else if(expect(Exp)) {
            console.log("Single line 'ret' not found. Instead found Single line Exp. index:" + index);
            ; // Just let it fall through
        } else {
            console.log("Not single line. checking for indent. index:" + index);
            if(!expect(Indent)) {
                index = indexBefore;
                return false;
            }
            console.log("Found indent. Checking for Block. index:" + index);
            expect(Block);
            console.log("Done with Block search. Looking for return statement. index:" + index + ", lexeme: " + parseTokens[index].lexeme);
            var indexMid = index;
            if(parseTokens[index].kind === "Newline" && parseTokens[index+1].lexeme === 'ret') {
                index+=2;
                console.log("Found newline and ret. index:" + index + ", Lexeme: " + parseTokens[index].lexeme);
                expect(Exp);
                console.log("Found return statement. index:" + index);
            } else {
                console.log("No newline found or 'ret' found. index:" + index + ", Lexeme: " + parseTokens[index].lexeme);
            }
            console.log("Done with return statement. Looking for Dedent. index:" + index);
            if(!expect(Dedent)) {
                index = indexBefore;
                return false;
            }
            console.log("Successful end of function. index:" + index + " \n");
        }
        console.log("Finalizing function success. index:" + index);
        console.log(parseTokens[index]);
        console.log('\n');
        return true;
    }
};