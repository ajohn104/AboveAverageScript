// Exp2            ::= (Exp3 '?' Exp3 ':')? Exp3
module.exports = {
    is: function() {
        // This is the code I had here previously, but I found it caused an infinite loop. A lot. A TON. So although it
        // is the correct associativity (I think), I can't use it.
        /*var indexBefore = index;
        debug("Starting on exp2. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
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
        debug("Finalizing exp2 success. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        return true;*/
        var indexBefore = index;
        debug("Starting on exp2. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(!expect(Exp3)) {
            index = indexBefore;
            return false;
        }
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
            if(!expect(Exp3)) {
                index = indexBefore;
                return false;
            }
        }
        debug("Finalizing exp2 success. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        return true;
    }
};