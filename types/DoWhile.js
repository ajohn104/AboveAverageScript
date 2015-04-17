// DoWhile         ::= 'do' Indent Block Dedent Newline 'while' Exp
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;
        var entity = new DoWhile();
        if(!at('do')) {
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

        if(!at(env.Newline)) {
            env.index = indexBefore;
            return false;
        }

        if(!at('while')) {
            env.index = indexBefore;
            return false;
        }

        if(!at(env.Exp)) {
            env.index = indexBefore;
            return false;
        }
        entity.condition = env.last;
        env.last = entity;
        return true;
    }
};

var DoWhile = function() {
    this.block = null;
    this.condition = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "do..\n";
        out += this.block.toString(indentlevel+1, indLvlHidden+1) + "\n";
        out += indents + "..while" + this.condition.toString(0, indLvlHidden);
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        write(scope.env(indents) + 'do {\n');
        this.block.compile(write, scope, indLvlHidden+1, indentsHidden+1);
        write('} while(');
        this.rightSideExps[0].compile(write, scope, 0, indentsHidden);
        write(')');
    };
};