// Exp8            ::= Exp9 (EqualOp Exp9)*
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("Starting on exp8. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(!expect(Exp9)) {
            index = indexBefore;
            return false;
        }

        while(expect(EqualOp)) {
            if(!expect(Exp9)) {
                index = indexBefore;
                return false;
            }
        }
        console.log("Finalizing exp8 success. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        return true;
    }
};