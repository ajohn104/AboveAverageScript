// Default        ::= Newline 'default' ':' Indent Block Dedent
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity = new Default();
        if(!at(envir.Newline)) {
            envir.index = indexBefore;
            return false;
        }

        if(!at('default')) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(':')) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Indent)) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Block)) {
            envir.index = indexBefore;
            return false;
        }
        entity.block = envir.last;

        if(!at(envir.Dedent)) {
            envir.index = indexBefore;
            return false;
        }

        envir.last = entity;
        return true;
    }
};

var Default = function() {
    this.block = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "DefaultCase ->\n";
        out += this.block.toString(indentlevel+1, indLvlHidden + 1);
        return out;
    };
};