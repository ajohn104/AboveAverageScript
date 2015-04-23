// IfStmt          ::= 'if' Exp1 ':' Indent Block Dedent (Newline 'elif' Exp1 ':' Indent Block Dedent)* (Newline 'else' Indent Block Dedent)?
module.exports = function(env, at, next, debug) {
    var Exp1, Indent, Block, Dedent, Newline;
    return {
        loadData: function() {
            Exp1 = env.Exp1,
            Indent = env.Indent,
            Block = env.Block,
            Dedent = env.Dedent,
            Newline = env.Newline;
        },
        is: function() {
            var indexBefore = env.index;
            var entity;
            if(!at('if')) {
                env.index = indexBefore;
                return false;
            }
            entity = new IfStmt();
            if(!at(Exp1)) {
                env.index = indexBefore;
                return false;
            }
            var ifEnt = new If();
            ifEnt.condition = env.last;

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

            ifEnt.block = env.last;
            entity.ifEntity = ifEnt;

            if(!at(Dedent)) {
                env.index = indexBefore;
                return false;
            }
            debug("Completed 'if' block. Moving on to elif. env.index:" + env.index);
            while(env.parseTokens[env.index].kind === "Newline" && env.parseTokens[env.index+1].lexeme === 'elif') {
                var elifEnt = new Elif();
                env.index+=2;
                if(!at(Exp1)) {
                    env.index = indexBefore;
                    return false;
                }
                elifEnt.condition = env.last;
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
                elifEnt.block = env.last;

                if(!at(Dedent)) {
                    env.index = indexBefore;
                    return false;
                }
                entity.elifEntities.push(elifEnt);
            }
            debug("Completed 'elif' blocks. Moving on to else. env.index:" + env.index);
            if(env.parseTokens[env.index].kind === "Newline" && env.parseTokens[env.index+1].lexeme === 'else') {
                env.index+=2;
                var elseEnt = new Else();
                if(!at(Indent)) {
                    env.index = indexBefore;
                    return false;
                }

                if(!at(Block)) {
                    env.index = indexBefore;
                    return false;
                }
                elseEnt.block = env.last;
                if(!at(Dedent)) {
                    env.index = indexBefore;
                    return false;
                }
                entity.elseEntity = elseEnt;
            }
            debug("Completed 'else' block. Done with IfStmt. env.index:" + env.index);
            env.last = entity;
            return true;
        }
    };
};

var IfStmt = function() {
    this.ifEntity = null;
    this.elifEntities = [];
    this.elseEntity = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = this.ifEntity.toString(indentlevel, indLvlHidden);
        for(var i = 0; i < this.elifEntities.length; i++) {
            out += this.elifEntities[i].toString(indentlevel, indLvlHidden);
        }
        if(this.elseEntity !== null) {
            out += this.elseEntity.toString(indentlevel, indLvlHidden);
        }
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        this.ifEntity.compile(write, scope, indents, indentsHidden);
        for(var i = 0; i < len(this.elifEntities); i++) {
            this.elifEntities[i].compile(write, scope, 0, indentsHidden);
        }
        if(this.elseEntity !== null) {
            this.elseEntity.compile(write, scope, 0, indentsHidden);
        }
    };
};

var If = function() {
    this.condition = null;
    this.block = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "if ->\n"; 
        out += indents + env.ind + "condition: " + this.condition.toString(0, indLvlHidden) + "\n";
        out += this.block.toString(indentlevel + 1, indLvlHidden+1);
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        write(scope.ind(indents) + 'if(');
        this.condition.compile(write, scope, 0, indentsHidden);
        write(') {\n');
        this.block.compile(write, scope, indents+1, indentsHidden+1);
        write(scope.ind(indents) + '}');
    };
};

var Elif = function() {
    this.condition = null;
    this.block = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = "\n" + indents + "elif ->";
        out += indents + env.ind + "condition: " + this.condition.toString(0, indLvlHidden) + "\n";
        out += this.block.toString(indentlevel + 1, indLvlHidden+1) + "\n";
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        write(scope.ind(indents) + ' else if(');
        this.condition.compile(write, scope, 0, indentsHidden);
        write(') {\n');
        this.block.compile(write, scope, indents+1, indentsHidden+1);
        write(scope.ind(indents) + '}');
    };
};

var Else = function() {
    this.block = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = "\n" + indents + "else ->\n" + this.block.toString(indentlevel + 1, indLvlHidden+1);
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        write(scope.ind(indents) + ' else {\n');
        this.block.compile(write, scope, indents+1, indentsHidden+1);
        write(scope.ind(indents) + '}');
    };
};