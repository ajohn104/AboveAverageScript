// Newline         ::= '\n'
module.exports = function(env, at, next, debug) {
    return {
        loadData: function() {},
        is: function() {
            return at('\\n');
        }
    };
};

// entity is dealt with by Lexeme;