// Prop            ::= (Id | BoolLit | StringLit) ':' Exp
module.exports = function(env, at, next, debug) {
    var Id, BoolLit, StringLit, Exp;
    return {
        loadData: function() {
            Id = env.Id,
            BoolLit = env.BoolLit,
            StringLit = env.StringLit,
            Exp = env.Exp;
        },
        is: function() {
            var indexBefore = env.index;
            var entity = new Prop();
            debug("Prop: checking for Id|BoolLit|StringLit, index: " + env.index );
            if(!(at(Id) || at(BoolLit) || at(StringLit))) {
                env.index = indexBefore;
                debug("Prop: cannot find Id|BoolLit|StringLit, index: " + env.index );
                return false;
            }
            entity.leftexp = env.last;
            debug("Prop: found Id|BoolLit|StringLit, index: " + env.index );

            debug("Prop: checking for ':', index: " + env.index );
            if(!at(':')) {
                env.index = indexBefore;
                debug("Prop: cannot find ':', index: " + env.index );
                return false;
            }
            debug("Prop: found ':', index: " + env.index );
            debug("Prop: checking for Exp, index: " + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            if(!at(Exp)) {
                env.index = indexBefore;
                debug("Prop: cannot find Exp, index: " + env.index );
                return false;
            }
            entity.rightexp = env.last;

            env.last = entity;
            debug("Prop: found Exp. Completed. index: " + env.index );
            return true;
        }
    };
};

var Prop = function() {
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