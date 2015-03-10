// Exp7            ::= Exp8 ('&' Exp8)*
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("Starting on exp7. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(!expect(Exp8)) {
            index = indexBefore;
            return false;
        }

        while(parseTokens[index].lexeme === '&') {
            index++;
            if(!expect(Exp8)) {
                index = indexBefore;
                return false;
            }
        }
        console.log("Finalizing exp7 success. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        return true;
    }
};