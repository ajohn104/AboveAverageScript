// Dedent          ::= '\d'
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        if(!at('\\d')) {
            envir.index = indexBefore;
            return false;
        }
        return true;
    }
};

// Entity is dealt with by Lexeme.