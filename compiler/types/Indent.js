// Indent          ::= '\i'
module.exports = {
    is: function() {
        var indexBefore = index;
        if(parseTokens[index].lexeme !== '\\i') {
            index = indexBefore;
            return false;
        }
        index++;
        return true;
    }
};