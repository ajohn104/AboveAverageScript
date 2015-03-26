// IfStmt          ::= 'if' Exp ':' Indent Block Dedent (Newline 'elif' Exp ':' Indent Block Dedent)* (Newline 'else' Indent Block Dedent)?
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity;
        if(!at('if')) {
            envir.index = indexBefore;
            return false;
        }
        entity = new IfStmt();
        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }
        var ifEnt = new If();
        ifEnt.condition = envir.last;

        if(!at(':')) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Indent)) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Block)) {
            envir.index = indexBefore;
            return false;
        }

        ifEnt.block = envir.last;
        entity.ifEntity = ifEnt;

        if(!at(envir.Dedent)) {
            envir.index = indexBefore;
            return false;
        }
        debug("Completed 'if' block. Moving on to elif. envir.index:" + envir.index);
        while(envir.parseTokens[envir.index].kind === "Newline" && envir.parseTokens[envir.index+1].lexeme === 'elif') {
            var elifEnt = new Elif();
            envir.index+=2;
            if(!at(envir.Exp)) {
                envir.index = indexBefore;
                return false;
            }
            elifEnt.condition = envir.last;
            if(!at(':')) {
                envir.index = indexBefore;
                return false;
            }

            if(!at(envir.Indent)) {
                envir.index = indexBefore;
                return false;
            }

            if(!at(envir.Block)) {
                envir.index = indexBefore;
                return false;
            }
            elifEnt.block = envir.last;

            if(!at(envir.Dedent)) {
                envir.index = indexBefore;
                return false;
            }
            entity.elifEntities.push(elifEnt);
        }
        debug("Completed 'elif' blocks. Moving on to else. envir.index:" + envir.index);
        if(envir.parseTokens[envir.index].kind === "Newline" && envir.parseTokens[envir.index+1].lexeme === 'else') {
            envir.index+=2;
            var elseEnt = new Else();
            if(!at(envir.Indent)) {
                envir.index = indexBefore;
                return false;
            }

            if(!at(envir.Block)) {
                envir.index = indexBefore;
                return false;
            }
            elseEnt.block = envir.last;
            if(!at(envir.Dedent)) {
                envir.index = indexBefore;
                return false;
            }
            entity.elseEntity = elseEnt;
        }
        debug("Completed 'else' block. Done with IfStmt. envir.index:" + envir.index);
        envir.last = entity;
        return true;
    }
};

var IfStmt = function() {
    this.ifEntity = null;
    this.elifEntities = [];
    this.elseEntity = null;
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = this.ifEntity.toString(indentlevel);
        for(var i = 0; i < this.elifEntities.length; i++) {
            out += this.elifEntities[i].toString(indentlevel);
        }
        if(this.elseEntity !== null) {
            out += this.elseEntity.toString(indentlevel);
        }
        return out;
    };
};

var If = function() {
    this.condition = null;
    this.block = null;
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "if condition:" + this.condition.toString() + "\n";
        out += this.block.toString(indentlevel + 1);
        return out;
    };
};

var Elif = function() {
    this.condition = null;
    this.block = null;
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "elif condition:" + this.condition.toString() + "\n";
        out += this.block.toString(indentlevel + 1);
        return out;
    };
};

var Else = function() {
    this.block = null;
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "else\n" + this.block.toString(indentlevel + 1);
        return out;
    };
};