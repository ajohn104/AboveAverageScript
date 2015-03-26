// IntLit          ::= '[+-]?((0x[a-fA-F0-9]+)|(\d+(\.\d+)?([eE][+-]?\d+)?))'
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity = new IntLit();
        if(envir.parseTokens[envir.index].kind !== 'IntLit') {
            envir.index = indexBefore;
            return false;
        }
        entity.val = envir.parseTokens[envir.index].lexeme;
        envir.index++;
        envir.last = entity;
        return true;
    }
};

var IntLit = function() {
    this.val = null;
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = this.val;
        return out;
    };
};