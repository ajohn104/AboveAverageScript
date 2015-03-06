// Func            ::= 'func' (Id (',' Id)* )? '->' ('ret'? Exp) | (Indent Block (Newline 'ret' Exp?)? Dedent)
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("Beginning func testing. index:" + index);
        if(parseTokens[index].lexeme !== 'func') {
            index = indexBefore;
            return false;
        }
        index++;

        if(expect(Id)) {
            while(parseTokens[index].lexeme === ',') {
                index++;
                if(!expect(Id)) {
                    index = indexBefore;
                    return false;
                }
            }
        }

        if(parseTokens[index].lexeme !== '->') {
            index = indexBefore;
            return false;
        }
        index++;

        if(parseTokens[index].lexeme === 'ret') {
            index++;
            if(!expect(Exp)) {
                index = indexBefore;
                return false;
            }
        } else if(expect(Exp)) {
            ; // Just let it fall through
        } else {
            if(!expect(Indent)) {
                index = indexBefore;
                return false;
            }

            if(!expect(Block)) {
                index = indexBefore;
                return false;
            }

            if(expect(Newline)) {
                if(parseTokens[index].lexeme !== 'ret') {
                    index = indexBefore;
                    return false;
                }
                index++;
                expect(Exp);
            }

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