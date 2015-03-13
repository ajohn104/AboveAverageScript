// ArrayLit        ::= ('[' ']') | ArrayCont
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;

        if(parseTokens[envir.index].lexeme === '[') {
            envir.index++;
            if(parseTokens[envir.index].lexeme === ']') {
                envir.index++;
                return true;
            }
            envir.index = indexBefore;
        }

        return at(envir.ArrayCont);
    }
};