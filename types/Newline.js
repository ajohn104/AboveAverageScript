// Newline         ::= '\n'
module.exports = {
    is: function(at, next, env, debug) {
        return at('\\n');
    }
};

// entity is dealt with by Lexeme;