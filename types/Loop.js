// Loop            ::= WhileLoop | ForLoop
module.exports = function(env, at, next, debug) {
    var WhileLoop, ForLoop;
    return {
        loadData: function() {
            WhileLoop = env.WhileLoop,
            ForLoop = env.ForLoop;
        },
        is: function() {
            return at(WhileLoop) || at(ForLoop);
        }
    };
};

// Doesn't need an entity. Should be gained from while and for loop.