// RegExp          ::= '\/[^\/\\]+(?:\\.[^\/\\]*)*\/[igm]{0,3}'
module.exports = function(env, at, next, debug) {
    return {
        loadData: function() {},
        is: function() {
            var indexBefore = env.index;
            var entity = new RegExpLit();
            if(env.parseTokens[env.index].kind !== 'RegExpLit') {
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

var RegExpLit = function() {
    this.val = null;
    this.isSingular = function() { return true; };
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = this.val;
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        write(this.val);
    };
};