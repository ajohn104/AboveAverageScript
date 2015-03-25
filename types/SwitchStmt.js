// SwitchStmt      ::= 'switch' Exp ':' Indent Case+ Default? Dedent
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;

        if(!at('switch')) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }

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

        while(at(envir.Case));

        at(envir.Default);

        if(!at(envir.Dedent)) {
            envir.index = indexBefore;
            return false;
        }

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
        out += indents + "    condition: " + this.condition + "\n";
        for(var i = 0; i < this.cases.length; i++) {
            out += this.cases[i].toString(indentlevel + 1);
        }
        out += indents + "]\n";
        out += indents + "defaultCase: \n" 
        out += this.defaultCase.toString(indentlevel + 1);
        return out;
    };      // This toString needs work.
};