// ArrayLit        ::= ('[' ']') | ArrayCont
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;
        var entity = new ArrayLit();
        if(at('[') && at(']'))  {
            env.last = entity;
            return true;
        }
        env.index = indexBefore;
        var found = at(env.ArrayCont);
        if(found) {
            entity = env.last;
            env.last = entity;
        }
        return found;
    }
};

var ArrayLit = function() {
    this.array = [];
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = (this.array.length === [])?indents + "[]":this.array.toString(indentlevel, indLvlHidden);
        return out;
    };
};