// ReturnStmt      ::= 'ret' Exp?
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;

        if(!at('ret')) {
            envir.index = indexBefore;
            return false;
        }
        at(envir.Exp);
        return true;
    }
};