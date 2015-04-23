// WhileLoop       ::= DoWhile | While
module.exports = function(env, at, next, debug) {
    var DoWhile, While;
    return {
        loadData: function() {
            DoWhile = env.DoWhile,
            While = env.While;
        },
        is: function() {
            return at(DoWhile) || at(While);
        }
    };
};

// Doesn't need an entity. It is gained from DoWhile and While.