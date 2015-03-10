// Exp17           ::= Exp18
// removed: ('.' Exp16 Call?)*
module.exports = {
    is: function() {
        var indexBefore = index;
        debug("Starting on exp17. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(!expect(Exp18)) {
            index = indexBefore;
            return false;
        }

        /*while(parseTokens[index].lexeme === '.') {
            index++;
            if(!expect(Exp16)) {
                index = indexBefore;
                return false;
            }

            expect(Call);
        }*/
        debug("Finalizing exp17 success. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        return true;
    }
};