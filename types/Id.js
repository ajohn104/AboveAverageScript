// Id              ::= '[_$a-zA-Z][$\w]*(?=[^$\w]|$)'
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;
        var entity = new Id();
        if(env.parseTokens[env.index].kind !== 'Id') {
            env.index = indexBefore;
            return false;
        }
        entity.val = env.parseTokens[env.index].lexeme;
        env.index++;
        debug("Finalizing id success. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index-1].lexeme);
        env.last = entity;
        return true;
    }
};

var Id = function() {
    this.val = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = this.val;
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        write(scope.ind(indents) + this.val);
    };
};