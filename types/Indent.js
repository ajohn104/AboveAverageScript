// Indent          ::= '\i'
module.exports = {
    is: function(at, next, envir, debug) {
        return at('\\i');
    }
};

// Entity is dealt with by Lexeme.