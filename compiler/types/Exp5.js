// Exp5            ::= Exp6 ('|' Exp6)*
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("Starting on exp5. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(!expect(Exp6)) {
            index = indexBefore;
            return false;
        }

        while(parseTokens[index].lexeme === '|') {
            index++;
            if(!expect(Exp6)) {
                index = indexBefore;
                return false;
            }
        }
        console.log("Finalizing exp5 success. index:" + index + ', lexeme: ' + parseTokens[index-1].lexeme);
        return true;
    }
};