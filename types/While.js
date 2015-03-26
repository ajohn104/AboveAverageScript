// While           ::= 'while' Exp ':' Indent Block Dedent
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity = new While();
        debug("Checking for while loop");
        if(!at('while')) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Exp)) {
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

var While = function() {
    this.condition = null;
    this.block = null;
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "while" + this.condition.toString() + "\n";
        out += this.block.toString(indentlevel+1);
        return out;
    };
};