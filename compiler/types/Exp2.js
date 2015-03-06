// Exp2            ::= (Exp3 '?' Exp3 ':')? Exp3
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("Starting on exp2. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(expect(Exp3)) {
            if(parseTokens[index].lexeme === '?') {
                index++;
                if(!expect(Exp3)) {
                    index = indexBefore;
                    return false;
                }
                if(parseTokens[index].lexeme !== ':') {
                    index = indexBefore;
                    return false;
                }
                index++;
            } else {
                index = indexBefore;
            }
        }
        if(!expect(Exp3)) {
            index = indexBefore;
            return false;
        }
        console.log("Finalizing exp2 success. index:" + index + ', lexeme: ' + parseTokens[index-1].lexeme);
        return true;
    }
};