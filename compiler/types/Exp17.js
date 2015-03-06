// Exp17           ::= Exp18 ('.' Id)*
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("Starting on exp17. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(!expect(Exp18)) {
            index = indexBefore;
            return false;
        }

        while(parseTokens[index].lexeme === '.') {
            index++;
            if(!expect(Id)) {
                index = indexBefore;
                return false;
            }
        }
        console.log("Finalizing exp17 success. index:" + index + ', lexeme: ' + parseTokens[index-1].lexeme);
        return true;
    }
};