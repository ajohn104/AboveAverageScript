// DoWhile         ::= 'do' Indent Block Dedent Newline 'while' Exp1
module.exports = function(env, at, next, debug) {
    var Indent, Newline, Block, Dedent, Newline, Exp1;
    return {
        loadData: function() {
            Indent = env.Indent,
            Block = env.Block,
            Dedent = env.Dedent,
            Newline = env.Newline,
            Exp1 = env.Exp1;
        },
        is: function() {
            var indexBefore = env.index;
            var entity = new DoWhile();
            if(!at('do')) {
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

            if(!at(Newline)) {
                env.index = indexBefore;
                return false;
            }

            if(!at('while')) {
                env.index = indexBefore;
                return false;
            }

            if(!at(Exp1)) {
                env.index = indexBefore;
                return false;
            }
            entity.condition = env.last;
            env.last = entity;
            return true;
        }
    };
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