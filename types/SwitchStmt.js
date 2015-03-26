// SwitchStmt      ::= 'switch' Exp ':' Indent Case+ Default? Dedent
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;

        var entity = new SwitchStmt();
        if(!at('switch')) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }
        entity.condition = envir.last;

        if(!at(':')) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Indent)) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Case)) {
            envir.index = indexBefore;
            return false;
        }
        entity.cases.push(envir.last);

        while(at(envir.Case)) {
            entity.cases.push(envir.last);
        }

        var foundDefault = at(envir.Default);
        if(foundDefault) {
            entity.defaultCase = envir.last;
        }

        if(!at(envir.Dedent)) {
            envir.index = indexBefore;
            return false;
        }

        envir.last = entity;
        return true;
    }
};

var SwitchStmt = function() {
    this.condition  = null;
    this.cases = [];
    this.defaultCase = null;
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "SwitchStmt ->\n";
        out += indents + "  condition: " + this.condition + "\n";
        for(var i = 0; i < this.cases.length; i++) {
            out += this.cases[i].toString(indentlevel + 1);
        }
        out += indents + "]\n";
        out += this.defaultCase.toString(indentlevel + 1);
        return out;
    };
};