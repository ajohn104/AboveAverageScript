// DoWhile         ::= 'do' Indent Block Dedent Newline 'while' Exp
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;

        if(parseTokens[envir.index].lexeme !== 'do') {
            envir.index = indexBefore;
            return false;
        } 
        envir.index++;

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

        if(parseTokens[envir.index].lexeme !== 'while') {
            envir.index = indexBefore;
            return false;
        } 
        envir.index++;

        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }

        return true;
    }
};