// SwitchStmt      ::= 'switch' Exp ':' Indent Case+ Dedent
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;

        if(parseTokens[envir.index].lexeme !== 'switch') {
            envir.index = indexBefore;
            return false;
        } 
        envir.index++;

        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }

        if(parseTokens[envir.index].lexeme !== ':') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;

        if(!at(envir.Indent)) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Case)) {
            envir.index = indexBefore;
            return false;
        }

        while(at(envir.Case));

        if(!at(envir.Dedent)) {
            envir.index = indexBefore;
            return false;
        }

        return true;
    }
};