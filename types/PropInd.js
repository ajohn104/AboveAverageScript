// PropInd         ::= (Id | BoolLit | StringLit) ':' (Exp | ObjInd)
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity = new PropInd();
        if(!(at(envir.Id) || at(envir.BoolLit) || at(envir.StringLit))) {
            envir.index = indexBefore;
            return false;
        }
        entity.leftexp = envir.last;
        if(!at(':')) {
            envir.index = indexBefore;
            return false;
        }
        if(!(at(envir.Exp) || at(envir.ObjInd))) {
            envir.index = indexBefore;
            return false;
        }
        entity.rightexp = envir.last;

        envir.last = entity;
        return true;
    }
};

var PropInd = function() {
    this.leftexp = null;
    this.rightexp = null;
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "Property(key(" + this.leftexp.toString();
        out += "):val(" + this.rightexp.toString();
        out += "))";
        return out;
    };
};