// While           ::= 'while' Exp1 ':' Indent Block Dedent
module.exports = function(env, at, next, debug) {
    var Exp1, Indent, Block, Dedent;
    return {
        loadData: function() {
            Exp1 = env.Exp1,
            Indent = env.Indent,
            Block = env.Block,
            Dedent = env.Dedent;
        },
        is: function() {
            var indexBefore = env.index;
            var entity = new While();
            debug("Checking for while loop");
            if(!at('while')) {
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

            if(!at(Block)) {
                env.index = indexBefore;
                return false;
            }
            entity.block = env.last;

            if(!at(Dedent)) {
                env.index = indexBefore;
                return false;
            }

            env.last = entity;
            return true;
        }
    };
};

var While = function() {
    this.condition = null;
    this.block = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "while ->\n";
        out += indents + env.ind + "condition:" + this.condition.toString(0, indLvlHidden) + "\n";
        out += this.block.toString(indentlevel+1, indLvlHidden+1);
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        write(scope.ind(indents) + 'while(');
        this.condition.compile(write, scope, 0, indentsHidden);
        write(') {\n');
        this.block.compile(write, scope, indents+1, indentsHidden+1);
        write(scope.ind(indents) + '}');
    };
};