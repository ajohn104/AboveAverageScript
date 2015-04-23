// SwitchStmt      ::= 'switch' Exp1 ':' Indent Case+ Default? Dedent
module.exports = function(env, at, next, debug) {
    var Exp1, Indent, Case, Default, Dedent;
    return {
        loadData: function() {
            Exp1 = env.Exp1,
            Indent = env.Indent,
            Case = env.Case,
            Default = env.Default,
            Dedent = env.Dedent;
        },
        is: function() {
            var indexBefore = env.index;

            var entity = new SwitchStmt();
            if(!at('switch')) {
                env.index = indexBefore;
                return false;
            }

            if(!at(Exp1)) {
                env.index = indexBefore;
                return false;
            }
            entity.condition = env.last;

            if(!at(':')) {
                env.index = indexBefore;
                return false;
            }

            if(!at(Indent)) {
                env.index = indexBefore;
                return false;
            }

            if(!at(Case)) {
                env.index = indexBefore;
                return false;
            }
            entity.cases.push(env.last);

            while(at(Case)) {
                entity.cases.push(env.last);
            }

            var foundDefault = at(Default);
            if(foundDefault) {
                entity.defaultCase = env.last;
            }

            if(!at(Dedent)) {
                env.index = indexBefore;
                return false;
            }

            env.last = entity;
            return true;
        }
    };
};

var SwitchStmt = function() {
    this.condition  = null;
    this.cases = [];
    this.defaultCase = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "SwitchStmt ->\n";
        out += indents + env.ind + "condition: " + this.condition.toString(0,indLvlHidden) + "\n";
        for(var i = 0; i < this.cases.length; i++) {
            out += this.cases[i].toString(indentlevel + 1, indLvlHidden+1);
        }
        out += indents + "]\n";
        out += this.defaultCase.toString(indentlevel + 1, indLvlHidden+1);
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        write(scope.ind(indents) + 'switch(');
        this.condition.compile(write, scope, 0, indentsHidden);
        write(') {\n');
        for(var i = 0; i < len(this.cases); i++) {
            this.cases[i].compile(write, scope, indents+1, indentsHidden+1);
        }
        write(scope.ind(indents) + '}');
    };
};