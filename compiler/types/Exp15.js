// Exp15           ::= 'new'? Exp16 Call?
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("Starting on exp15. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(parseTokens[index].lexeme === 'new') {
            index++;
        }

        if(!expect(Exp16)) {
            index = indexBefore;
            return false;
        }

        expect(Call);
        console.log("Finalizing exp15 success. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        return true;
    }
};