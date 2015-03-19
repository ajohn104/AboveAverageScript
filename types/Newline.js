// Newline         ::= '\n'
module.exports = {
    is: function(at, next, envir, debug) {
        return at('\\n');
    }
};