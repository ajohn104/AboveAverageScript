// SwitchStmt      ::= 'switch' Exp ':' Indent Case+ Defaults? Dedent
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;

        if(!at('switch')) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(':')) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Indent)) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Case)) {
            envir.index = indexBefore;
            return false;
        }

        while(at(envir.Case));

        at(envir.Defaults);

        if(!at(envir.Dedent)) {
            envir.index = indexBefore;
            return false;
        }

        return true;
    }
};