// IntLit          ::= '[+-]?((0x[a-fA-F0-9]+)|(\d+(\.\d+)?([eE][+-]?\d+)?))'
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;
        var entity = new IntLit();
        if(env.parseTokens[env.index].kind !== 'IntLit') {
            env.index = indexBefore;
            return false;
        }
        entity.val = env.parseTokens[env.index].lexeme;
        env.index++;
        env.last = entity;
        return true;
    }
};

var IntLit = function() {
    this.val = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = this.val;
        return out;
    };
};