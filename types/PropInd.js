// PropInd         ::= (Id | BoolLit | StringLit) ':' (Exp | ObjInd)
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;
        var entity = new PropInd();
        if(!(at(env.Id) || at(env.BoolLit) || at(env.StringLit))) {
            env.index = indexBefore;
            return false;
        }
        entity.leftexp = env.last;
        if(!at(':')) {
            env.index = indexBefore;
            return false;
        }
        if(!(at(env.Exp) || at(env.ObjInd))) {
            env.index = indexBefore;
            return false;
        }
        entity.rightexp = env.last;

        env.last = entity;
        return true;
    }
};

var PropInd = function() {
    this.leftexp = null;
    this.rightexp = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "Property -> key(" + this.leftexp.toString(0, indLvlHidden);
        out += ") : val(" + this.rightexp.toString(0, indLvlHidden) + ")";
        return out;
    };
};