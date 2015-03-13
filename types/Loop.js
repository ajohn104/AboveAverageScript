// Loop            ::= WhileLoop | ForLoop
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        
        return at(envir.WhileLoop) || at(envir.ForLoop);
    }
};