// Id              ::= '[_$a-zA-Z][$\w]*(?=[^$\w]|$)'
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity = new Id();
        if(envir.parseTokens[envir.index].kind !== 'Id') {
            envir.index = indexBefore;
            return false;
        }
        entity.val = envir.parseTokens[envir.index].lexeme;
        envir.index++;
        debug("Finalizing id success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index-1].lexeme);
        envir.last = entity;
        return true;
    }
};

var Id = function() {
    this.val = null;
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = this.val;
        return out;
    };
};