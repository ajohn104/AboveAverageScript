// Exp3            ::= Exp4 ('or' Exp4)*
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("Starting on exp3. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
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
        console.log("Finalizing exp3 success. index:" + index + ', lexeme: ' + parseTokens[index-1].lexeme);
        return true;
    }
};