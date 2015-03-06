// Dedent          ::= '\d'
module.exports = {
    is: function() {
        var indexBefore = index;
        if(parseTokens[index].lexeme !== '\\d') {
            index = indexBefore;
            return false;
        }
        index++;
        return true;
    }
};