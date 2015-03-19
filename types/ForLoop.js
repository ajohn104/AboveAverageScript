// ForLoop         ::= (ForIn | ForColon | For) ':' Indent Block Dedent
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;

        if(!at(envir.ForIn) && !at(envir.ForColon) && !at(envir.For)) {
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