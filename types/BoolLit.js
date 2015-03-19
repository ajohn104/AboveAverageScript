// BoolLit         ::= 'true' | 'false'
module.exports = {
    is: function(at, next, envir, debug) {
        var bools = ['true', 'false'];
        return at(bools);
    }
};