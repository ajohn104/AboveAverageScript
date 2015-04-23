// PropInd         ::= (Id | BoolLit | StringLit) ':' (Exp1 | ObjInd)
module.exports = function(env, at, next, debug) {
    var Id, BoolLit, StringLit, Exp1, ObjInd;
    return {
        loadData: function() {
            Id = env.Id,
            BoolLit = env.BoolLit,
            StringLit = env.StringLit,
            Exp1 = env.Exp1,
            ObjInd = env.ObjInd;
        },
        is: function() {
            var indexBefore = env.index;
            var entity = new PropInd();
            if(!(at(Id) || at(BoolLit) || at(StringLit))) {
                env.index = indexBefore;
                return false;
            }
            entity.leftexp = env.last;
            if(!at(':')) {
                env.index = indexBefore;
                return false;
            }
            if(!(at(Exp1) || at(ObjInd))) {
                env.index = indexBefore;
                return false;
            }
            entity.rightexp = env.last;

            env.last = entity;
            return true;
        }
    };
};

var PropInd = function() {
    this.leftexp = null;
    this.rightexp = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "Property -> key: " + this.leftexp.toString(0, indLvlHidden);
        out += ", val: " + this.rightexp.toString(0, indLvlHidden);
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        this.leftexp.compile(write, scope, indents, indentsHidden);
        write(':');
        this.rightexp.compile(write, scope, 0, indentsHidden);
        write(',');
    };
};