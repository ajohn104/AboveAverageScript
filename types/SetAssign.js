// SetAssign       ::= Exp AssignOp Exp
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity = new SetAssign();
        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }
        entity.leftexp = envir.last;
        if(!at(envir.AssignOp)) {
            envir.index = indexBefore;
            return false;
        }
        entity.operator = envir.last;
        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }
        entity.rightexp = envir.last;

        envir.last = entity;
        return true;
    }
};

var SetAssign = function() {
    this.leftexp = null;
    this.operator = null;
    this.rightexp = null;
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "Assign(" + this.leftexp.toString();
        out += this.operator + this.rightexp.toString();
        out += ")";
        return out;
    };
};