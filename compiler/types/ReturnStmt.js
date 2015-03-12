// ReturnStmt      ::= 'ret' Exp?
module.exports = {
    is: function() {
        var indexBefore = index;

        if(parseTokens[index].lexeme !== 'ret') {
            index = indexBefore;
            return false;
        }
        index++;
        expect(Exp);
        return true;
    }
};