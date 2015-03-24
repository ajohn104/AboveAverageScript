// ExpList         ::= Exp (Newline? ',' Exp)*
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index; 
        var indentedBefore = envir.inIndent;
        debug("ExpList: beginning search. envir.index:" + envir.index);
        if(!at(envir.Exp)) {
            envir.index = indexBefore; envir.inIndent = indentedBefore;
            return false;
        }
        debug("ExpList: found Exp. envir.index:" + envir.index);
        var indexMid = envir.index;
        at(envir.Newline);
        while(at(',')) {
            if(!at(envir.Exp)) {
                envir.index = indexBefore; envir.inIndent = indentedBefore;
                return false;
            }
            indexMid = envir.index;
            at(envir.Newline);
        }
        envir.index = indexMid;
        return true;
    }
}
