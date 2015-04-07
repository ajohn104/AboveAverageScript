// Exp15           ::= Exp16 PostfixOp?
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index; 
        var indentedBefore = envir.inIndented;
        var entity = new Exp15();
        debug("Starting on exp15. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp16)) {
            envir.index = indexBefore; 
            envir.inIndented = indentedBefore;
            return false;
        }
        entity.val = envir.last;
        envir.checkIndent();

        var foundOp = at(envir.PostfixOp);
        if(foundOp) {
            entity.postfix = envir.last;
        }

        envir.last = entity;
        debug("Finalizing exp15 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};

var Exp15 = function() {
    this.val = null;
    this.postfix = "";
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = (this.postfix.length > 0?"(":"") + this.val.toString(indentlevel, indLvlHidden) + (this.postfix.length > 0?")":"") + this.postfix;
        return out;
    };
};