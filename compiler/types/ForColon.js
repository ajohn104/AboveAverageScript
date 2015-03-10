// ForColon        ::= 'for' Id ':' Exp
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("Starting for-colon. index:" + index);
        if(parseTokens[index].lexeme !== 'for') {
            index = indexBefore;
            return false;
        } 
        index++;

        if(!expect(Id)) {
            index = indexBefore;
            return false;
        }

        if(parseTokens[index].lexeme !== ':') {
            index = indexBefore;
            return false;
        }
        index++;
        if(!expect(Exp)) {
            index = indexBefore;
            return false;
        }
        console.log("Completed for-colon. index:" + index);
        return true;
    }
};