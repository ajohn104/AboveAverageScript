// Dedent          ::= '\d'
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;
        if(!at('\\d')) {
            env.index = indexBefore;
            return false;
        }
        return true;
    }
};

// Entity is dealt with by Lexeme.