// SwitchStmt      ::= 'switch' Exp ':' Indent Case+ Default? Dedent
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;

        var entity = new SwitchStmt();
        if(!at('switch')) {
            env.index = indexBefore;
            return false;
        }

        if(!at(env.Exp)) {
            env.index = indexBefore;
            return false;
        }
        entity.condition = env.last;

        if(!at(':')) {
            env.index = indexBefore;
            return false;
        }

        if(!at(env.Indent)) {
            env.index = indexBefore;
            return false;
        }

        if(!at(env.Case)) {
            env.index = indexBefore;
            return false;
        }
        entity.cases.push(env.last);

        while(at(env.Case)) {
            entity.cases.push(env.last);
        }

        var foundDefault = at(env.Default);
        if(foundDefault) {
            entity.defaultCase = env.last;
        }

        if(!at(env.Dedent)) {
            env.index = indexBefore;
            return false;
        }

        env.last = entity;
        return true;
    }
};

var SwitchStmt = function() {
    this.condition  = null;
    this.cases = [];
    this.defaultCase = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "SwitchStmt ->\n";
        out += indents + env.ind + "condition: " + this.condition + "\n";
        for(var i = 0; i < this.cases.length; i++) {
            out += this.cases[i].toString(indentlevel + 1, indLvlHidden+1);
        }
        out += indents + "]\n";
        out += this.defaultCase.toString(indentlevel + 1, indLvlHidden+1);
        return out;
    };
};