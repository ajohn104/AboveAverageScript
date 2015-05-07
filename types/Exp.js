// Exp             ::= Exp1 (ForIn | ForColon)*
module.exports = function(env, at, next, debug) {
    var Exp1, ForIn, ForColon, checkIndent, Dedent;
    return {
        loadData: function() {
            Exp1 = env.Exp1,
            ForColon = env.ForColon,
            ForIn = env.ForIn,
            checkIndent = env.checkIndent,
            Dedent = env.Dedent;
        },
        is: function() {
            debug("Starting on exp. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            var indexBefore = env.index;
            var indentedBefore = env.inIndented;
            var entity = new Exp();
            env.indentedExp.push(env.inIndented);
            env.inIndented = false;
            
            if(!at(Exp1)) {
                env.index = indexBefore; 
                env.inIndented = indentedBefore;
                env.inIndented = env.indentedExp.pop();
                return false;
            }
            entity.val = env.last;
            checkIndent();

            while(at(ForIn) || at(ForColon)) {
                entity.furtherExps.push(env.last);
                checkIndent();
            }
            
            if(env.inIndented && !at(Dedent)) {
                debug("Unfinished indented exp. Exp failed.")
                env.index = indexBefore; 
                env.inIndented = indentedBefore;
                env.inIndented = env.indentedExp.pop();
                return false;
            }
            env.inIndented = env.indentedExp.pop();
            if(entity.furtherExps.length === 0) {
                entity = entity.val;
            }
            env.last = /*(entity.furtherExps.length === 0)?entity.val:*/entity;
            debug("Finalizing exp success. env.index:" + env.index  + ', lexeme: ' + env.parseTokens[env.index].lexeme + '\n');
            return true;
        }
    };
};

var Exp = function() {
    this.val = null;
    this.furtherExps = [];
    this.isExp = true;
    this.isEnclosed = false;
    this.buried = undefined;
    this.isSingular = function() { return this.val.isSingular() };
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
        var max = this.furtherExps.length;
        var dataVar = scope.randId();
        if(this.isEnclosed) {
            write('(');
        }
        if(max > 0) {
            write('(function() {var ' + dataVar + ' = [];' );
        }
        for(var i = 0; i < max; i++) {
            this.furtherExps[i].compile(write, scope, indents + i, indentsHidden + i);
            write('\n');
        }
        // write(scope.ind(indents) + 'IKCSPRASHUN'); -- deprecated
        write(scope.ind(indents + max));
        if(max > 0) {
            write(dataVar + '.push(');
        }
        this.val.compile(write, scope, 0, indentsHidden + max);
        if(max > 0) {
            write(');');
        }
        for(var j = max - 1; j >= 0; j--) {
            write('\n' + scope.ind(indents + j) + '});');
        }
        if(max > 0) {
            write('return ' + dataVar + '})()');
        }
        if(this.isEnclosed) {
            write(')');
        }
    };
    this.compileRedo = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        this.dig();
        var max = this.furtherExps.length;
        if(!isUndef(this.buried)) {
            // Prepare the store locations for buried. This pretty much just means an array.
            // All the info for this is stored in buried (buried isn't the actual exp to evaluate)
        }
        if(max > 0) {
            // Prepare the store locations for any evaluated values. Also just an array.
        }
        // now for the for loop

    };
    this.dig = function() {
        // So this needs to search for a defined child of each entity. If a child is found,
        // it should check to see if that child is an Exp.
        if(isUndef(this.buried)) {
            return;
        }
        var searchChild = this.child;
        while(!isUndef(searchChild = searchChild.child)) {
            if(searchChild.isExp && searchChild.furtherExps.length > 0) {
                searchChild.buried = this.buried;
                //delete this.buried;
                this.buried = undefined;
                return;
            }
        }
    };
};