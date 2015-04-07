// ForIn           ::= 'for' Id (',' Id)? 'in' Exp
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity = new ForIn();
        debug("Starting for-in. envir.index:" + envir.index);
        if(!at('for')) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Id)) {
            envir.index = indexBefore;
            return false;
        }
        entity.idone = envir.last;

        if(at(',')) {
            if(!at(envir.Id)) {
                envir.index = indexBefore;
                return false;
            }
            entity.idtwo = envir.last;
        }

        if(!at('in')) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }
        entity.exp = envir.last;
        envir.last = entity;
        debug("Completed for-in. envir.index:" + envir.index);
        return true;
    }
};

var ForIn = function() {
    this.idone = null;
    this.idtwo = null;
    this.exp = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "(for " + this.idone;
        if(this.idtwo !== null) {
            out += "," + this.idtwo;
        }
        out += " in " + this.exp.toString(0, indLvlHidden) + ")";
        return out;
    };
};