// IfStmt          ::= 'if' Exp ':' Indent Block Dedent (Newline 'elif' Exp ':' Indent Block Dedent)* (Newline 'else' Indent Block Dedent)?
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;
        var entity;
        if(!at('if')) {
            env.index = indexBefore;
            return false;
        }
        entity = new IfStmt();
        if(!at(env.Exp)) {
            env.index = indexBefore;
            return false;
        }
        var ifEnt = new If();
        ifEnt.condition = env.last;

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

        ifEnt.block = env.last;
        entity.ifEntity = ifEnt;

        if(!at(env.Dedent)) {
            env.index = indexBefore;
            return false;
        }
        debug("Completed 'if' block. Moving on to elif. env.index:" + env.index);
        while(env.parseTokens[env.index].kind === "Newline" && env.parseTokens[env.index+1].lexeme === 'elif') {
            var elifEnt = new Elif();
            env.index+=2;
            if(!at(env.Exp)) {
                env.index = indexBefore;
                return false;
            }
            elifEnt.condition = env.last;
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
            elifEnt.block = env.last;

            if(!at(env.Dedent)) {
                env.index = indexBefore;
                return false;
            }
            entity.elifEntities.push(elifEnt);
        }
        debug("Completed 'elif' blocks. Moving on to else. env.index:" + env.index);
        if(env.parseTokens[env.index].kind === "Newline" && env.parseTokens[env.index+1].lexeme === 'else') {
            env.index+=2;
            var elseEnt = new Else();
            if(!at(env.Indent)) {
                env.index = indexBefore;
                return false;
            }

            if(!at(env.Block)) {
                env.index = indexBefore;
                return false;
            }
            elseEnt.block = env.last;
            if(!at(env.Dedent)) {
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
};

var Else = function() {
    this.block = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = "\n" + indents + "else ->\n" + this.block.toString(indentlevel + 1, indLvlHidden+1);
        return out;
    };
};