// ObjIndentDecl   ::= 'let' ObjIndentAssign
module.exports = {
    is: function() {
        var indexBefore = index;

        if(parseTokens[index].lexeme !== 'let') {
            index = indexBefore;
            return false;
        }
        index++;
        console.log("ObjIndentDecl: found 'let', index: " + index );
        console.log("ObjIndentDecl: checking for ObjIndentAssign");
        if(!expect(ObjIndentAssign)) {
            index = indexBefore;
            console.log("ObjIndentDecl: cannot find '=', index: " + index );
            return false;
        }
        return true;
    }
};