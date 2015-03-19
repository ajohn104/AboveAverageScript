// WhileLoop       ::= DoWhile | While
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;

        return at(envir.DoWhile) || at(envir.While);
    }
};