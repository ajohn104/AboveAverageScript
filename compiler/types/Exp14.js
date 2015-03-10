// Exp14           ::= Exp15 PostfixOp?
module.exports = {
    is: function() {
        var indexBefore = index;
        debug("Starting on exp14. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(!expect(Exp15)) {
            index = indexBefore;
            return false;
        }

        expect(PostfixOp);
        debug("Finalizing exp14 success. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        return true;
    }
};