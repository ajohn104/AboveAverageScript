// NativeStmt      ::= '***native***'
module.exports = {
    is: function(at, next, envir, debug) {
        return at('***native***');
    }
};

var NativeStmt = function() {
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "***native***\n"
        return out;
    };
};