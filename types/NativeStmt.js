// NativeStmt      ::= '***native***'
module.exports = {
    is: function(at, next, envir, debug) {
        var found = at('***native***');
        if(found) {
            envir.last = new NativeStmt();
            envir.nativeSpecified = true;
        }
        return found;
    }
};

var NativeStmt = function() {
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "***native***";
        return out;
    };
};