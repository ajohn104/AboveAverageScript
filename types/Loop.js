// Loop            ::= WhileLoop | ForLoop
module.exports = {
    is: function(at, next, envir, debug) {
        return at(envir.WhileLoop) || at(envir.ForLoop);
    }
};