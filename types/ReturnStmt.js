// ReturnStmt      ::= 'ret' Exp?
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;

        if(parseTokens[envir.index].lexeme !== 'ret') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;
        at(envir.Exp);
        return true;
    }
};