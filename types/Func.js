// Func            ::= 'func' (Id (',' Id)* )? '->' (Exp | ReturnStmt) | (Indent Block Dedent)
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;
        var entity = new Func();
        debug("Beginning func testing. env.index:" + env.index);
        if(!at('func')) {
            env.index = indexBefore;
            return false;
        }
        debug("Found 'func', looking for parameters. env.index:" + env.index);
        if(at(env.Id)) {
            entity.parameters.push(env.last);
            debug("Found Id. Checking for ','. env.index:" + env.index);
            while(at(',')) {
                debug("Found ','. Looking for Id. env.index:" + env.index);
                if(!at(env.Id)) {
                    env.index = indexBefore;
                    return false;
                }
                entity.parameters.push(env.last);
                debug("Found Id. Looking for ','. env.index:" + env.index);
            }
        }
        debug("End of parameters. Looking for '->'. env.index:" + env.index);
        if(!at('->')) {
            env.index = indexBefore;
            return false;
        }
        debug("Found '->'. Looking for single line 'ret'. env.index:" + env.index);
        if(at(env.Exp) || at(env.ReturnStmt)) {
            debug("Found single line exp or return stmt. env.index:" + env.index);
            entity.block = env.last;
            //debug("Single line 'ret' not found. Instead found Single line Exp. env.index:" + env.index);
            ; // Just let it fall through
        } else {
            debug("Not single line. checking for indent. env.index:" + env.index);
            if(!at(env.Indent)) {
                env.index = indexBefore;
                return false;
            }
            debug("Found indent. Checking for Block. env.index:" + env.index);
            if(!at(env.Block)) {
                env.index = indexBefore;
                return false;
            }
            entity.block = env.last;
            debug("Found Block. Looking for Dedent. env.index:" + env.index + ", lexeme: " + env.parseTokens[env.index].lexeme);
            if(!at(env.Dedent)) {
                env.index = indexBefore;
                return false;
            }
            debug("Successful end of function. env.index:" + env.index + " \n");
        }
        debug("Finalizing function success. env.index:" + env.index);
        debug(env.parseTokens[env.index]);
        debug('\n');
        env.last = entity;
        return true;
    }
};

var Func = function() {
    this.parameters = [];
    this.block = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indLvlHidden);
        var out = "function ->\n";
        out += indents + env.ind + "parameters: [";
        for(var i = 0; i < this.parameters.length; i++) {
            out += this.parameters[i].toString(0, indLvlHidden) + ",";
        }
        var removeCount = (this.parameters.length > 0?-1:0);
        out = out.substring(0, out.length + removeCount) + "]\n";
        out += this.block.toString(indLvlHidden+1, indLvlHidden+1);
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        write('function(');
        var max = len(this.parameters);
        if(max > 0) {
            this.parameters[0].compile(write, scope, 0, indentsHidden);
        }
        for(var i = 1; i < max; i++) {
            write(', ');
            this.parameters[i].compile(write, scope, 0, indentsHidden);
        }
        write(') {\n');
        this.block.compile(write, scope, indentsHidden+1, indentsHidden+1);
        if(this.block.constructor.name !== 'Block') {
            write('\n');
        }
        write(scope.ind(indentsHidden) + '}');
    };
};