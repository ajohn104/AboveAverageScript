// Case            ::= Newline 'case' Exp19 ':' Indent Block Dedent
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;

        if(!at(envir.Newline)) {
            envir.index = indexBefore;
            return false;
        }

        if(!at('case')) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Exp19)) {
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