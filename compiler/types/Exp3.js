// Exp3            ::= Exp4 ('or' Exp4)*
module.exports = {
    is: function() {
        var indexBefore = index;
        debug("Starting on exp3. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(!expect(Exp4)) {
            index = indexBefore;
            return false;
        }

        while(parseTokens[index].lexeme === 'or') {
            index++;
            if(!expect(Exp4)) {
                index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp3 success. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        return true;
    }
};