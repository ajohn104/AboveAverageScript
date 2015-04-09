// Indent          ::= '\i'
module.exports = {
    is: function(at, next, env, debug) {
        return at('\\i');
    }
};

// Entity is dealt with by Lexeme.