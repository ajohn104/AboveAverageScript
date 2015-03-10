// Exp6            ::= Exp7 ('^' Exp7)*
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("Starting on exp6. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(!expect(Exp7)) {
            index = indexBefore;
            return false;
        }

        while(parseTokens[index].lexeme === '^') {
            index++;
            if(!expect(Exp7)) {
                index = indexBefore;
                return false;
            }
        }
        console.log("Finalizing exp6 success. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        return true;
    }
};