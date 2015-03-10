// Exp9            ::= Exp10 (CompareOp Exp10)*
module.exports = {
    is: function() {
        var indexBefore = index;
        debug("Starting on exp9. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(!expect(Exp10)) {
            index = indexBefore;
            return false;
        }

        while(expect(CompareOp)) {
            if(!expect(Exp10)) {
                index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp9 success. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        return true;
    }
};