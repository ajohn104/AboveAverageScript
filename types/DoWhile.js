// DoWhile         ::= 'do' Indent Block Dedent Newline 'while' Exp
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;

        if(!at('do')) {
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

        if(!at(envir.Block)) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Dedent)) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Newline)) {
            envir.index = indexBefore;
            return false;
        }

        if(!at('while')) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }

        return true;
    }
};