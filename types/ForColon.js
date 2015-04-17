// ForColon        ::= 'for' Id ':' Exp
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;
        var entity = new ForColon();
        debug("Starting for-colon. env.index:" + env.index);
        if(!at('for')) {
            env.index = indexBefore;
            return false;
        } 

        if(!at(env.Id)) {
            env.index = indexBefore;
            return false;
        }
        entity.id = env.last;

        if(!at(':')) {
            env.index = indexBefore;
            return false;
        }
        if(!at(env.Exp)) {
            env.index = indexBefore;
            return false;
        }
        entity.exp = env.last;
        env.last = entity;
        debug("Completed for-colon. env.index:" + env.index);
        return true;
    }
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