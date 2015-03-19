// While           ::= 'while' Exp ':' Indent Block Dedent
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        debug("Checking for while loop");
        if(!at('while')) {
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

        if(!at(envir.Block)) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Dedent)) {
            envir.index = indexBefore;
            return false;
        }

        return true;
    }
};