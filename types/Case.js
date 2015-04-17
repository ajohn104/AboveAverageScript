// Case            ::= Newline 'case' Exp18 ':' Indent Block Dedent
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;
        var entity = new Case();
        if(!at(env.Newline)) {
            env.index = indexBefore;
            return false;
        }

        if(!at('case')) {
            env.index = indexBefore;
            return false;
        }

        if(!at(env.Exp18)) {
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

        if(!at(env.Block)) {
            env.index = indexBefore;
            return false;
        }
        entity.block = env.last;

        if(!at(env.Dedent)) {
            env.index = indexBefore;
            return false;
        }

        env.last = entity;
        return true;
    }
};

var Case = function() {
    this.condition = null;
    this.block = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "Case ->\n";
        out += indents + env.ind + "condition: " + this.condition.toString(0, indLvlHidden) + "\n";
        out += this.block.toString(indentlevel+1, indLvlHidden+1);
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        for(var i = 0; i < len(this.stmts); i++) {
            write(scope.ind(indents) + 'case ');
            this.condition.compile(write, scope, 0, indentsHidden);
            write(':\n');
            this.block.compile(write, scope, indents+1, indentsHidden+1);
        }
    };
};