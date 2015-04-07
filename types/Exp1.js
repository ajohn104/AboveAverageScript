// Exp1            ::= Exp2 ('if' Exp2 ('else' Exp2)?)?
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var indentedBefore = envir.inIndented;
        debug("Starting on exp1. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp2)) {
            envir.index = indexBefore;
            envir.inIndented = indentedBefore;
            return false;
        }
        envir.checkIndent();
        if(at('if')) {
            envir.checkIndent();
            if(!at(envir.Exp2)) {
                envir.index = indexBefore;
                envir.inIndented = indentedBefore;
                return false;
            }
            envir.checkIndent();
            if(at('else')) {
                envir.checkIndent();
                if(!at(envir.Exp2)) {
                    envir.index = indexBefore;
                    envir.inIndented = indentedBefore;
                    return false;
                }
            }
        }
        debug("Finalizing exp1 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};

var Exp1 = function() {
    this.val = null;
    this.ifexp = null;
    this.elseexp = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = this.val.toString(indentlevel, indLvlHidden);
        if(this.ifexp !== null) {
            out += "if(" + this.ifexp.toString(0, indLvlHidden) +")";
            if(this.elseexp !== null) {
                out += "else(" + this.elseexp.toString(0, indLvlHidden) + ")";
            }
        }
        return out;
    };
};