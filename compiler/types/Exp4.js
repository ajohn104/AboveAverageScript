// Exp4            ::= Exp5 ('and' Exp5)*
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("Starting on exp4. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(!expect(Exp5)) {
            index = indexBefore;
            return false;
        }

        while(parseTokens[index].lexeme === 'and') {
            index++;
            if(!expect(Exp5)) {
                index = indexBefore;
                return false;
            }
        }
        console.log("Finalizing exp4 success. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        return true;
    }
};