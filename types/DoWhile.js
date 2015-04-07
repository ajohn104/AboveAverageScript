// DoWhile         ::= 'do' Indent Block Dedent Newline 'while' Exp
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity = new DoWhile();
        if(!at('do')) {
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

        if(!at(envir.Newline)) {
            envir.index = indexBefore;
            return false;
        }

        if(!at('while')) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }
        entity.condition = envir.last;
        envir.last = entity;
        return true;
    }
};

var DoWhile = function() {
    this.block = null;
    this.condition = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "do..\n";
        out += this.block.toString(indentlevel+1, indLvlHidden+1);
        out += indents + "..while" + this.condition.toString(0, indLvlHidden);
        return out;
    };
};