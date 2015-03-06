// Newline         ::= '\n'
module.exports = {
    is: function() {
        var indexBefore = index;
        if(parseTokens[index].lexeme !== '\\n') {
            index = indexBefore;
            return false;
        }
        index++;
        return true;
    }
};