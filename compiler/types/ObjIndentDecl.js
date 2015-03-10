// ObjIndentDecl   ::= 'let' ObjIndentAssign
module.exports = {
    is: function() {
        var indexBefore = index;

        if(parseTokens[index].lexeme !== 'let') {
            index = indexBefore;
            return false;
        }
        index++;
        debug("ObjIndentDecl: found 'let', index: " + index );
        debug("ObjIndentDecl: checking for ObjIndentAssign");
        if(!expect(ObjIndentAssign)) {
            index = indexBefore;
            debug("ObjIndentDecl: cannot find '=', index: " + index );
            return false;
        }
        return true;
    }
};