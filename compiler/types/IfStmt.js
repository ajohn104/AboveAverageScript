// IfStmt          ::= 'if' Exp ':' Indent Block Dedent (Newline 'elif' Exp ':' Indent Block Dedent)* (Newline 'else' Indent Block Dedent)?
module.exports = {
    is: function() {
        var indexBefore = index;

        if(parseTokens[index].lexeme !== 'if') {
            index = indexBefore;
            return false;
        }
        index++;

        if(!expect(Exp)) {
            index = indexBefore;
            return false;
        }

        if(parseTokens[index].lexeme !== ':') {
            index = indexBefore;
            return false;
        }
        index++;

        if(!expect(Indent)) {
            index = indexBefore;
            return false;
        }

        if(!expect(Block)) {
            index = indexBefore;
            return false;
        }

        if(!expect(Dedent)) {
            index = indexBefore;
            return false;
        }
        console.log("Completed 'if' block. Moving on to elif. index:" + index);
        while(parseTokens[index].kind === "Newline" && parseTokens[index+1].lexeme === 'elif') {
            index+=2;
            if(!expect(Exp)) {
                index = indexBefore;
                return false;
            }

            if(parseTokens[index].lexeme !== ':') {
                index = indexBefore;
                return false;
            }
            index++;

            if(!expect(Indent)) {
                index = indexBefore;
                return false;
            }

            if(!expect(Block)) {
                index = indexBefore;
                return false;
            }

            if(!expect(Dedent)) {
                index = indexBefore;
                return false;
            }
        }
        console.log("Completed 'elif' blocks. Moving on to else. index:" + index);
        if(parseTokens[index].kind === "Newline" && parseTokens[index+1].lexeme === 'else') {
            index+=2;
            
            if(!expect(Indent)) {
                index = indexBefore;
                return false;
            }

            if(!expect(Block)) {
                index = indexBefore;
                return false;
            }

            if(!expect(Dedent)) {
                index = indexBefore;
                return false;
            }
        }
        console.log("Completed 'else' block. Done with IfStmt. index:" + index);
        return true;
    }
};