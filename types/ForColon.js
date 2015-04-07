// ForColon        ::= 'for' Id ':' Exp
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity = new ForColon();
        debug("Starting for-colon. envir.index:" + envir.index);
        if(!at('for')) {
            envir.index = indexBefore;
            return false;
        } 

        if(!at(envir.Id)) {
            envir.index = indexBefore;
            return false;
        }
        entity.id = envir.last;

        if(!at(':')) {
            envir.index = indexBefore;
            return false;
        }
        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }
        entity.exp = envir.last;
        envir.last = entity;
        debug("Completed for-colon. envir.index:" + envir.index);
        return true;
    }
};

var ForColon = function() {
    this.id = null;
    this.exp = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "(for " + this.id;
        out += " : " + this.exp.toString(0, indLvlHidden) + ")";
        return out;
    };
};