// Dedent          ::= '\d'
module.exports = {
    is: function() {
        var indexBefore = index;
        if(tokens[index].lexeme !== '\\d') {
            index = indexBefore;
            return false;
        }
        index++;
        return true;
    };
};