// Exp12           ::= Exp13 (MulOp Exp13)*
module.exports = {
    is: function() {
        var indexBefore = index;
        debug("Starting on exp12. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(!expect(Exp13)) {
            index = indexBefore;
            return false;
        }

        while(expect(MulOp)) {
            if(!expect(Exp13)) {
                index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp12 success. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        return true;
    }
};