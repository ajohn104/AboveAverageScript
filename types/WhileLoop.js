// WhileLoop       ::= DoWhile | While
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;

        return at(envir.DoWhile) || at(envir.While);
    }
};