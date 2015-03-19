// NativeStmt      ::= '***native***'
module.exports = {
    is: function(at, next, envir, debug) {
        return at('***native***');
    }
};