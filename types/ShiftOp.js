// ShiftOp         ::= '>>>' | '>>' | '<<'
module.exports = {
    is: function(at, next, env, debug) {
        var ops = ['>>>', '>>', '<<'];
        return at(ops);
    }
};