// RegExp          ::= '\/[^\/\\]+(?:\\.[^\/\\]*)*\/[igm]{0,3}'
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity = new RegExpLit();
        if(envir.parseTokens[envir.index].kind !== 'RegExpLit') {
            envir.index = indexBefore;
            return false;
        }
        entity.val = envir.parseTokens[envir.index].lexeme;
        envir.index++;
        envir.last = entity;
        return true;
    }
};

var RegExpLit = function() {
    this.val = null;
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = this.val;
        return out;
    };
};