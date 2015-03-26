// Exp3            ::= Exp4 ('?' Exp4 ':' Exp4)?
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index; 
        var indentedBefore = envir.inIndented;
        var entity = new Exp3();
        debug("Starting on exp3. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp4)) {
            envir.index = indexBefore; 
            envir.inIndented = indentedBefore;
            return false;
        }
        entity.val = envir.last;
        envir.checkIndent();
        if(at('?')) {
            envir.furtherExps = {};
            envir.checkIndent();
            if(!at(envir.Exp4)) {
                envir.index = indexBefore; 
                envir.inIndented = indentedBefore;
                return false;
            }
            envir.furtherExps.firstexp = envir.last;
            envir.checkIndent();
            if(!at(':')) {
                envir.index = indexBefore; 
                envir.inIndented = indentedBefore;
                return false;
            }
            envir.checkIndent();
            if(!at(envir.Exp4)) {
                envir.index = indexBefore; 
                envir.inIndented = indentedBefore;
                return false;
            }
            envir.furtherExps.secondexp = envir.last;
        }
        envir.last = entity;
        debug("Finalizing exp3 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};

var Exp3 = function() {
    this.val = null;
    this.furtherExps = null;
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = this.val.toString(indentlevel);
        if(this.furtherExps !== null) {
            out += "?(" + this.furtherExps.firstexp.toString(indentlevel) + "):(";
            out += this.furtherExps.secondexp.toString(indentlevel) + ")";
        }
        return out;
    };
};