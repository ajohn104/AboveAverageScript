// ForLoop         ::= (ForIn | ForColon | For) ':' Indent Block Dedent
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity = new ForLoop();
        if(!at(envir.ForIn) && !at(envir.ForColon) && !at(envir.For)) {
            envir.index = indexBefore;
            return false;
        }
        entity.loop = envir.last;
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

var ForLoop = function() {
    this.loop = null;
    this.block = null;
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + this.loop.toString() + "\n";
        out += this.block.toString(indentlevel+1);
        return out;
    };
};