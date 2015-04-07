// Exp9            ::= Exp10 (EqualOp Exp10)*
module.exports = {
    is: function(at, next, envir, debug) {
        debug("Starting on exp9. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        var indexBefore = envir.index; 
        var indentedBefore = envir.inIndented;
        var entity = new Exp9();
        if(!at(envir.Exp10)) {
            envir.index = indexBefore; 
            envir.inIndented = indentedBefore;
            return false;
        }
        entity.val = envir.last;
        envir.checkIndent();
        var indexMid = envir.index;
        while(at(envir.EqualOp)) {
            var part = {operator: envir.last};
            envir.checkIndent();
            
            if(!at(envir.Exp10)) {
                envir.index = indexMid;
                break;
            }
            part.exp = envir.last;
            entity.furtherExps.push(part);
            indexMid = envir.index;
        }
        envir.last = entity;
        debug("Finalizing exp9 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};

var Exp9 = function() {
    this.val = null;
    this.furtherExps = [];
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = "";
        for(var j = 0; j < this.furtherExps.length; j++) {
            out += "(";
        }
        out += this.val.toString(indentlevel, indLvlHidden);
        for(var i = 0; i < this.furtherExps.length; i++) {
            out += this.furtherExps[i].operator + this.furtherExps[i].exp.toString(indentlevel, indLvlHidden) + ")";
        }
        return out;
    };
};