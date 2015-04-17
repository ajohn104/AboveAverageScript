// Exp             ::= Exp1 (ForIn | ForColon)*
module.exports = {
    is: function(at, next, env, debug) {
        debug("Starting on exp. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
        var indexBefore = env.index;
        var indentedBefore = env.inIndented;
        var entity = new Exp();
        env.indentedExp.push(env.inIndented);
        env.inIndented = false;
        
        if(!at(env.Exp1)) {
            env.index = indexBefore; 
            env.inIndented = indentedBefore;
            env.inIndented = env.indentedExp.pop();
            return false;
        }
        entity.val = env.last;
        env.checkIndent();

        while(at(env.ForIn) || at(env.ForColon)) {
            entity.furtherExps.push(env.last);
            env.checkIndent();
        }
        
        if(env.inIndented && !at(env.Dedent)) {
            debug("Unfinished indented exp. Exp failed.")
            env.index = indexBefore; 
            env.inIndented = indentedBefore;
            env.inIndented = env.indentedExp.pop();
            return false;
        }
        env.inIndented = env.indentedExp.pop();
        env.last = entity;
        debug("Finalizing exp success. env.index:" + env.index  + ', lexeme: ' + env.parseTokens[env.index].lexeme + '\n');
        return true;
    }
};

var Exp = function() {
    this.val = null;
    this.furtherExps = [];
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents;
        for(var j = 0; j < this.furtherExps.length; j++) {
            out += "(";
        }
        out += this.val.toString(0, indLvlHidden);
        for(var i = 0; i < this.furtherExps.length; i++) {
            out += this.furtherExps[i].toString(0, indLvlHidden) + ")";
        }
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        var max = len(this.furtherExps);
        for(var i = 0; i < max; i++) {
            this.furtherExps[i].compile(write, scope, indents + i, indentsHidden + i);
            write('\n');
        }
        // write(scope.ind(indents) + 'IKCSPRASHUN'); -- deprecated
        write(scope.ind(indents + max));
        this.val.compile(write, scope, 0, indentsHidden + max);
        for(var j = max - 1; j >= 0; j--) {
            write('\n' + scope.ind(indents + j) + '})');
        }
    };
};