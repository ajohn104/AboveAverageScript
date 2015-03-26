// Exp14           ::= PrefixOp? Exp15
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index; 
        var indentedBefore = envir.inIndented;
        var entity = new Exp14();
        debug("Starting on exp14. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(at(envir.PrefixOp)) {
            entity.prefixOp = envir.last;
            envir.checkIndent();
        }

        if(!at(envir.Exp15)) {
            envir.index = indexBefore; 
            envir.inIndented = indentedBefore;
            return false;
        }
        entity.val = envir.last;
        debug("Finalizing exp14 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};

var Exp14 = function() {
    this.prefixOp = "";
    this.val = null;
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = this.prefix + (this.prefix.length > 0?"(":"") + this.val.toString(indentlevel) + (this.prefix.length > 0?")":"");
        return out;
    };
};