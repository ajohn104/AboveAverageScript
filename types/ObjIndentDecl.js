// ObjIndentDecl   ::= 'let' ObjIndentAssign
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;

        if(!at('let')) {
            envir.index = indexBefore;
            return false;
        }
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