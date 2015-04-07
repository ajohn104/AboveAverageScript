// Prop            ::= (Id | BoolLit | StringLit) ':' Exp
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity = new Prop();
        debug("Prop: checking for Id|BoolLit|StringLit, index: " + envir.index );
        if(!(at(envir.Id) || at(envir.BoolLit) || at(envir.StringLit))) {
            envir.index = indexBefore;
            debug("Prop: cannot find Id|BoolLit|StringLit, index: " + envir.index );
            return false;
        }
        entity.leftexp = envir.last;
        debug("Prop: found Id|BoolLit|StringLit, index: " + envir.index );

        debug("Prop: checking for ':', index: " + envir.index );
        if(!at(':')) {
            envir.index = indexBefore;
            debug("Prop: cannot find ':', index: " + envir.index );
            return false;
        }
        debug("Prop: found ':', index: " + envir.index );
        debug("Prop: checking for Exp, index: " + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            debug("Prop: cannot find Exp, index: " + envir.index );
            return false;
        }
        entity.rightexp = envir.last;

        envir.last = entity;
        debug("Prop: found Exp. Completed. index: " + envir.index );
        return true;
    }
};

var Prop = function() {
    this.leftexp = null;
    this.rightexp = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "Property -> key(" + this.leftexp.toString(0, indLvlHidden);
        out += ") : val" + this.rightexp.toString(0, indLvlHidden);
        //out += ")";
        return out;
    };
};