// ReturnStmt      ::= 'ret' Exp?
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;

        if(!at('ret')) {
            envir.index = indexBefore;
            return false;
        }
        var entity = new ReturnStmt();
        var foundExp = at(envir.Exp);
        if(foundExp) {
            entity.exp = envir.last;
        }
        envir.last = entity;
        return true;
    }
};

var ReturnStmt = function() {
    this.exp = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "ret" + ((this.exp !== null)?(this.exp.toString(0, indLvlHidden)):("")) + "\n";
        return out;
    };
};