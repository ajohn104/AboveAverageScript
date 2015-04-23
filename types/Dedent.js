// Dedent          ::= '\d'
module.exports = function(env, at, next, debug) {
    return {
        loadData: function() {},
        is: function() {
            return at('\\d');
        }
    };
};

// Entity is dealt with by Lexeme.