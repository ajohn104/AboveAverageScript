// Exp13           ::= PrefixOp? Exp14
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("Starting on exp13. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        expect(PrefixOp);

        if(!expect(Exp14)) {
            index = indexBefore;
            return false;
        }
        console.log("Finalizing exp13 success. index:" + index + ', lexeme: ' + parseTokens[index-1].lexeme);
        return true;
    }
};