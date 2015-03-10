// Exp11           ::= Exp12 (AddOp Exp12)*
module.exports = {
    is: function() {
        var indexBefore = index;
        debug("Starting on exp11. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(!expect(Exp12)) {
            index = indexBefore;
            return false;
        }

        while(expect(AddOp)) {
            if(!expect(Exp12)) {
                index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp11 success. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        return true;
    }
};