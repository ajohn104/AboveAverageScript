// ArrayLit        ::= ('[' ']') | ArrayCont
module.exports = function(env, at, next, debug) {
    var ArrayCont;
    return {
        loadData: function() {
            ArrayCont = env.ArrayCont;
        },
        is: function() {
            var indexBefore = env.index;
            var entity = new ArrayLit();
            if(at('[') && at(']'))  {
                env.last = entity;
                return true;
            }
            env.index = indexBefore;
            var found = at(ArrayCont);
            if(found) {
                entity = env.last;
                env.last = entity;
            }
            return found;
        }
    };
};

var ArrayLit = function() {
    this.array = [];
    this.isSingular = function() { return true; };
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = (this.array === [])?indents + "[]":this.array.toString(indentlevel, indLvlHidden);
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        write('[]');
    };
};