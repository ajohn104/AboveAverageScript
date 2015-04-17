// ForLoop         ::= (ForIn | ForColon | For) ':' Indent Block Dedent
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;
        var entity = new ForLoop();
        if(!at(env.ForIn) && !at(env.ForColon) && !at(env.For)) {
            env.index = indexBefore;
            return false;
        }
        entity.loop = env.last;
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

var ForLoop = function() {
    this.loop = null;
    this.block = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + this.loop.toString(0, indLvlHidden) + "\n";
        out += this.block.toString(indentlevel+1, indLvlHidden+1);
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        this.loop.compile(write, scope, indents, indentsHidden);
        this.block.compile(write, scope, indents+1, indentsHidden+1);
        write(scope.ind(indents) + '}' + (this.loop.doesntNeedParens?'':')'));
    };
};