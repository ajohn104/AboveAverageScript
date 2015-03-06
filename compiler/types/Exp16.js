// Exp16           ::= Exp17 ArrayCont*
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("Starting on exp16. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(!expect(Exp17)) {
            index = indexBefore;
            return false;
        }

        while(expect(ArrayCont));
        console.log("Finalizing exp16 success. index:" + index + ', lexeme: ' + parseTokens[index-1].lexeme);
        return true;
    }
};