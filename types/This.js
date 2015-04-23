// This            ::= '_'
module.exports = function(env, at, next, debug) {
    return {
        loadData: function() {},
        is: function() {
            return at('_');
        }
    };
};