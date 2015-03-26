// WhileLoop       ::= DoWhile | While
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;

        return at(envir.DoWhile) || at(envir.While);
    }
};

// Doesn't need an entity. It is gained from DoWhile and While.