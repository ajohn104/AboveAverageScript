// Exp10           ::= Exp11 (ShiftOp Exp11)*
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("Starting on exp10. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(!expect(Exp11)) {
            index = indexBefore;
            return false;
        }

        while(expect(ShiftOp)) {
            if(!expect(Exp11)) {
                index = indexBefore;
                return false;
            }
        }
        console.log("Finalizing exp10 success. index:" + index + ', lexeme: ' + parseTokens[index-1].lexeme);
        return true;
    }
};