// This            ::= '_'
module.exports = {
    is: function(at, next, envir, debug) {
        return at('_');
    }
};