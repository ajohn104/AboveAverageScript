// ReturnStmt      ::= 'ret' Exp?
module.exports = function(env, at, next, debug) {
    var Exp;
    return {
        loadData: function() {
            Exp = env.Exp;
        },
        is: function() {
            var indexBefore = env.index;

            if(!at('ret')) {
                env.index = indexBefore;
                return false;
            }
            var entity = new ReturnStmt();
            var foundExp = at(Exp);
            if(foundExp) {
                entity.exp = env.last;
            }
            env.last = entity;
            return true;
        }
    };
};

var ReturnStmt = function() {
    this.exp = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "return" + ((this.exp !== null)?(" " + this.exp.toString(0, indLvlHidden)):(""));
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        write(scope.ind(indents) + 'return');
        if(this.exp !== null) {
            write(' ');
            this.exp.compile(write, scope, 0, indentsHidden);
        }
    };
};