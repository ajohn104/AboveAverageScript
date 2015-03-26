// ArrayLit        ::= ('[' ']') | ArrayCont
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity = new ArrayLit();
        if(at('[') && at(']'))  {
            envir.last = entity;
            return true;
        }
        envir.index = indexBefore;
        var found = at(envir.ArrayCont);
        if(found) {
            entity.val = envir.last;
            envir.last = entity;
        }
        return found;
    }
};

var ArrayLit = function() {
    this.array = [];
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = (this.array.length === [])?indents + "[]":this.array.toString(indentlevel);
        return out;
    };
};