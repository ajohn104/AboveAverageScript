// Loop            ::= WhileLoop | ForLoop
module.exports = {
    is: function(at, next, env, debug) {
        return at(env.WhileLoop) || at(env.ForLoop);
    }
};

// Doesn't need an entity. Should be gained from while and for loop.