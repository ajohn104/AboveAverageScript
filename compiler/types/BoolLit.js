// BoolLit         ::= 'true' | 'false'
module.exports = {
    is: function() {
        var indexBefore = index;
        if(parseTokens[index].lexeme === 'true' || parseTokens[index].lexeme === 'false') {
            index++;
            return true;
        }
        
        return false;
    }
};