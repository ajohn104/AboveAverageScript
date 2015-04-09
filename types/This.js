// This            ::= '_'
module.exports = {
    is: function(at, next, env, debug) {
        return at('_');
    }
};