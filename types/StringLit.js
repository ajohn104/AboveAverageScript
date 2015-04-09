// StringLit       ::= '\"[^\"\\]*(?:\\.[^\"\\]*)*\"|\'[^\'\\]*(?:\\.[^\'\\]*)*\''
module.exports = {
    is: function(at, next, env, debug) {
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

var StringLit = function() {
    this.val = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = this.val;
        return out;
    };
};