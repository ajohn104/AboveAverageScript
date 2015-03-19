// MulOp           ::= '%' | '/' | '*'
module.exports = {
    is: function(at, next, envir, debug) {
        var ops = ['%', '/', '*'];
        return at(ops);
    }
};