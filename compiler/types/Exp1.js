// Exp1            ::= Exp2 ('if' Exp2 ('else' Exp2)?)?
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("Starting on exp1. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(!expect(Exp2)) {
            index = indexBefore;
            return false;
        }

        if(parseTokens[index].lexeme === 'if') {
            index++;
            if(!expect(Exp2)) {
                index = indexBefore;
                return false;
            }
            if(parseTokens[index].lexeme === 'else') {
                index++;
                if(!expect(Exp2)) {
                    index = indexBefore;
                    return false;
                }
            }
        }
        console.log("Finalizing exp1 success. index:" + index + ', lexeme: ' + parseTokens[index-1].lexeme);
        return true;
    }
};