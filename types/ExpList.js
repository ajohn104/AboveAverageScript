// ExpList         ::= Exp (Newline? ',' Exp)*
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index; 
        var indentedBefore = envir.inIndented;
        var entity = new ExpList();
        debug("ExpList: beginning search. envir.index:" + envir.index);
        if(!at(envir.Exp)) {
            envir.index = indexBefore; envir.inIndented = indentedBefore;
            return false;
        }
        entity.exps.push(envir.last);
        debug("ExpList: found Exp. envir.index:" + envir.index);
        var indexMid = envir.index;
        at(envir.Newline);
        while(at(',')) {
            if(!at(envir.Exp)) {
                envir.index = indexBefore; envir.inIndented = indentedBefore;
                return false;
            }
            entity.exps.push(envir.last);
            indexMid = envir.index;
            at(envir.Newline);
        }
        envir.index = indexMid;
        envir.last = entity.exps;
        return true;
    }
};

var ExpList = function() {
    this.exps = [];
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = "([";
        for(var i = 0; i < this.furtherExps.length; i++) {
            out += this.exps[i].toString(indentlevel) + ",";
        }
        out = out.substring(0, out.length-1) + "])";
        return out;
    };
};