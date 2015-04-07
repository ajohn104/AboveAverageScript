// BoolLit         ::= 'true' | 'false'
module.exports = {
    is: function(at, next, envir, debug) {
        var bools = ['true', 'false'];
        var found = at(bools);
        var entity = new BoolLit();
        entity.val = envir.last;
        envir.last = entity;
        return found;
    }
};

var BoolLit = function() {
    this.val = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = this.val;
        return out;
    };
};