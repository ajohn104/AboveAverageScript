// This            ::= '_'
module.exports = {
    is: function() {
        var indexBefore = index;
        if(tokens[index].lexeme !== '_') {
            index = indexBefore;
            return false;
        }
        index++;
        return true;
    };
};