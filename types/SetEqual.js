// SetEqual        ::= Exp '=' Exp
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity = new SetEqual();
        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }
        entity.leftexp = envir.last;
        if(!at('=')) {
            envir.index = indexBefore;
            return false;
        }
        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }
        entity.rightexp = envir.last;

        envir.last = entity;
        return true;
    }
};

var SetEqual = function() {
    this.leftexp = null;
    this.rightexp = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "Declare(" + this.leftexp.toString(0, indLvlHidden);
        out += "=" + this.rightexp.toString(0, indLvlHidden);
        out += ")";
        return out;
    };
};