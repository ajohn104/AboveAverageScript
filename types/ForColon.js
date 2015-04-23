// ForColon        ::= 'for' Id ':' Exp
module.exports = function(env, at, next, debug) {
    var Id, Exp;
    return {
        loadData: function() {
            Id = env.Id,
            Exp = env.Exp;
        },
        is: function() {
            var indexBefore = env.index;
            var entity = new ForColon();
            debug("Starting for-colon. env.index:" + env.index);
            if(!at('for')) {
                env.index = indexBefore;
                return false;
            } 

            if(!at(Id)) {
                env.index = indexBefore;
                return false;
            }
            entity.id = env.last;

            if(!at(':')) {
                env.index = indexBefore;
                return false;
            }
            if(!at(Exp)) {
                env.index = indexBefore;
                return false;
            }
            entity.exp = env.last;
            env.last = entity;
            debug("Completed for-colon. env.index:" + env.index);
            return true;
        }
    };
};

var ForColon = function() {
    this.id = null;
    this.exp = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "(for " + this.id;
        out += " : " + this.exp.toString(0, indLvlHidden) + ")";
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        var keyId = this.id;
        var objId = scope.nextId();

        write(scope.ind(indents) + 'var ' + objId + ' = ');
        this.exp.compile(write, scope, 0, indentsHidden);
        write(';\n' + scope.ind(indentsHidden) + 'Object.keys(' 
            + objId + ').forEach(function(' + keyId + ') {');
    };
};