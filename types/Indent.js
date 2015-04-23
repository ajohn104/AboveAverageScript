// Indent          ::= '\i'
module.exports = function(env, at, next, debug) {
    return {
        loadData: function() {},
        is: function() {
            return at('\\i');
        }
    };
};

// Entity is dealt with by Lexeme.