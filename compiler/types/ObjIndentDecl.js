// ObjIndentDecl   ::= 'let' ObjIndentAssign
module.exports = {
    is: function() {
        var indexBefore = index;

        if(parseTokens[index].lexeme !== 'let') {
            index = indexBefore;
            return false;
        }
        index++;

        if(!expect(ObjIndentAssign)) {
            index = indexBefore;
            return false;
        }
        return true;
    }
};