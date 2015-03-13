// ObjIndentDecl   ::= 'let' ObjIndentAssign
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;

        if(parseTokens[envir.index].lexeme !== 'let') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;
        debug("ObjIndentDecl: found 'let', envir.index: " + envir.index );
        debug("ObjIndentDecl: checking for ObjIndentAssign");
        if(!at(envir.ObjIndentAssign)) {
            envir.index = indexBefore;
            debug("ObjIndentDecl: cannot find '=', envir.index: " + envir.index );
            return false;
        }
        return true;
    }
};