// ExpList         ::= Exp (',' Exp)*
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }

        while(at(',')) {
            if(!at(envir.Exp)) {
                envir.index = indexBefore;
                return false;
            }
        }
        return true;
    }
}
