// StringLit       ::= '\"[^\"\\]*(?:\\.[^\"\\]*)*\"|\'[^\'\\]*(?:\\.[^\'\\]*)*\''
module.exports = function(env, at, next, debug) {
    return {
        loadData: function() {},
        is: function() {
            var indexBefore = env.index;
            var entity = new StringLit();
            if(env.parseTokens[env.index].kind !== 'StrLit') {
                env.index = indexBefore;
                return false;
            }
            entity.val = env.parseTokens[env.index].lexeme;
            env.index++;
            env.last = entity;
            return true;
        }
    };
};

var StringLit = function() {
    this.val = null;
    this.isLiteral = true;
    this.isSingular = function() { return true; };
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