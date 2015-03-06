// This            ::= '_'
module.exports = {
    is: function() {
        var indexBefore = index;
        if(parseTokens[index].lexeme !== '_') {
            index = indexBefore;
            return false;
        }
        index++;
        return true;
    }
};