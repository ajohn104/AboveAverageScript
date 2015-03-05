// Indent          ::= '\i'
module.exports = {
    is: function() {
        var indexBefore = index;
        if(tokens[index].lexeme !== '\\i') {
            index = indexBefore;
            return false;
        }
        index++;
        return true;
    };
};