// Exp             ::= Exp1 (ForIn | ForColon)*
module.exports = {
    is: function(at, next, envir, debug) {
        debug("Starting on exp. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        var indexBefore = envir.index;
        var indentedBefore = envir.inIndented;
        var entity = new Exp();
        envir.indentedExp.push(envir.inIndented);
        envir.inIndented = false;
        
        if(!at(envir.Exp1)) {
            envir.index = indexBefore; 
            envir.inIndented = indentedBefore;
            envir.inIndented = envir.indentedExp.pop();
            return false;
        }
        entity.val = envir.last;
        envir.checkIndent();

        while(at(envir.ForIn) || at(envir.ForColon)) {
            entity.furtherExps.push(envir.last);
            envir.checkIndent();
        }
        
        if(envir.inIndented && !at(envir.Dedent)) {
            debug("Unfinished indented exp. Exp failed.")
            envir.index = indexBefore; 
            envir.inIndented = indentedBefore;
            envir.inIndented = envir.indentedExp.pop();
            return false;
        }
        envir.inIndented = envir.indentedExp.pop();
        envir.last = entity;
        debug("Finalizing exp success. envir.index:" + envir.index  + ', lexeme: ' + envir.parseTokens[envir.index].lexeme + '\n');
        return true;
    }
};

var Exp = function() {
    this.val = null;
    this.furtherExps = [];
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "Exp(" + this.val.toString(indentlevel);
        for(var i = 0; i < this.furtherExps.length; i++) {
            out += "(" + this.furtherExps[i].toString(indentlevel) + ")";
        }
        out += ")";
        return out;
    };
};