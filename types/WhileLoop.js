// WhileLoop       ::= DoWhile | While
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;

        return at(env.DoWhile) || at(env.While);
    }
};

// Doesn't need an entity. It is gained from DoWhile and While.