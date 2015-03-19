// This isn't actually a part of the macrosyntax, but rather a convenience method of sorts. For consistency.
module.exports = function(envir) {
    this.envir = envir;
    return function(lexeme) {
        return {
            lexeme: lexeme,
            is: function(at, next, envir, debug) {
                var indexBefore = envir.index;
                if(envir.parseTokens[envir.index].lexeme !== this.lexeme) {
                    envir.index = indexBefore;
                    return false;
                }
                envir.index++;
                return true;
            }
        }
    };
};