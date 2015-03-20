// SetAssign       ::= Exp AssignOp Exp
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }
        if(!at(envir.AssignOp)) {
            envir.index = indexBefore;
            return false;
        }
        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }
        return true;
    }
}