// Exp5            ::= Exp6 ('|' Exp6)*
module.exports = {
    is: function() {
        var indexBefore = index;
        debug("Starting on exp5. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
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
        debug("Finalizing exp5 success. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        return true;
    }
};