// NativeStmt      ::= '***native***'
module.exports = {
    is: function(at, next, env, debug) {
        var found = at('***native***');
        if(found) {
            env.last = new NativeStmt();
            env.nativeSpecified = true;
        }
        return found;
    }
};

var NativeStmt = function() {
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "***native***";
        return out;
    };
};