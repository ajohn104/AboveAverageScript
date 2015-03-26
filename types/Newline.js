// Newline         ::= '\n'
module.exports = {
    is: function(at, next, envir, debug) {
        return at('\\n');
    }
};

// entity is dealt with by Lexeme;