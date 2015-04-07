// Case            ::= Newline 'case' Exp18 ':' Indent Block Dedent
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity = new Case();
        if(!at(envir.Newline)) {
            envir.index = indexBefore;
            return false;
        }

        if(!at('case')) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Exp18)) {
            envir.index = indexBefore;
            return false;
        }
        entity.condition = envir.last;
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

var Case = function() {
    this.condition = null;
    this.block = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "Case ->\n";
        out += indents + "  condition: " + this.condition.toString(0, indLvlHidden) + "\n";
        out += this.block.toString(indentlevel+1, indLvlHidden+1);
        return out;
    };
};