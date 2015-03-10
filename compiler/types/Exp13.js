// Exp13           ::= PrefixOp? Exp14
module.exports = {
    is: function() {
        var indexBefore = index;
        debug("Starting on exp13. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        expect(PrefixOp);

        if(!expect(Exp14)) {
            index = indexBefore;
            return false;
        }
        debug("Finalizing exp13 success. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        return true;
    }
};