// Exp16           ::= Exp17 (ArrayCont | ('.' Exp16) Call?)*
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("Starting on exp16. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(!expect(Exp17)) {
            index = indexBefore;
            return false;
        }
        while(expect(ArrayCont) || parseTokens[index].lexeme === '.') {
            if(parseTokens[index].lexeme === '.') {
                index++;
                if(!expect(Exp16)) {
                    index = indexBefore;
                    return false;
                }
            }
            expect(Call);
        }
        /*while(parseTokens[index].lexeme === '.') {
            index++;
            if(!expect(Exp16)) {
                index = indexBefore;
                return false;
            }

            expect(Call);
        }*/
        console.log("Finalizing exp16 success. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        return true;
    }
};