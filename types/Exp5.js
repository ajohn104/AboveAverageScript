// Exp5            ::= Exp6 ('and' Exp6)*
module.exports = function(env, at, next, debug) {
    var Exp6, checkIndent;
    return {
        loadData: function() {
            Exp6 = env.Exp6,
            checkIndent = env.checkIndent;
        },
        is: function() {
            debug("Starting on exp5. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            var indexBefore = env.index; 
            var indentedBefore = env.inIndented;
            var entity = new Exp5();
            if(!at(Exp6)) {
                env.index = indexBefore; 
                env.inIndented = indentedBefore;
                return false;
            }
            entity.val = env.last;
            checkIndent();
            var indexMid = env.index;
            while(at('and')) {
                var part = {operator: '&&'/*env.last*/};
                checkIndent();
                if(!at(Exp6)) {
                    env.index = indexMid;
                    break;
                }
                part.exp = env.last;
                entity.furtherExps.push(part);
                indexMid = env.index;
            }
            if(entity.furtherExps.length === 0) {
                entity = entity.val;
            }
            env.last = /*(entity.furtherExps.length === 0)?entity.val:*/entity;
            debug("Finalizing exp5 success. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            return true;
        }
    };
};

var Exp5 = function() {
    this.val = null;
    this.furtherExps = [];
    this.isSingular = function() {
        if(!this.val.isSingular()) return false;
        for(var i = 0; i < this.furtherExps.length; i++) {
            if(!this.furtherExps[i].exp.isSingular()) return false;
        }
        return true;
    };
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = "";
        for(var j = 0; j < this.furtherExps.length; j++) {
            out += "(";
        }
        out += this.val.toString(indentlevel, indLvlHidden);
        for(var i = 0; i < this.furtherExps.length; i++) {
            out += this.furtherExps[i].operator + this.furtherExps[i].exp.toString(0, indLvlHidden) + ")";
        }
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        var max = len(this.furtherExps)-1;
        if(!this.isSingular()) {
            var values = scope.randId();
            var maxLen = scope.randId();        // Currently, it doesn't do max. It just looks for the most recent macro.
            var index = scope.randId();
            var retValArr = scope.randId();
            write('(function() {var ' + retValArr + ' = [];var ' + values + ' = [');
            var macroIndex = 0;
            this.val.compile(write, scope, 0, indentsHidden);
            write(',');
            for(var i = 0; i <= max; i++) {
                this.furtherExps[i].exp.compile(write, scope, 0, indentsHidden);
                write(',');
                if(!this.furtherExps[i].exp.isSingular()) {
                    macroIndex = i+1;
                }
            }
            write('];var ' + maxLen + ' = len(' + values + '[' + macroIndex + ']);');
            write('for(var ' + index + ' = 0;' + index + ' < ' + maxLen + ';' + index + '++) {');
            write(retValArr + '.push(' + values + '[0]');
            if(!this.val.isSingular()) {
                write('[' + index + ']');
            }
            for(var j = 0; j <= max; j++) {
                write(this.furtherExps[j].operator + values + '[' + (1+j) + ']');
                if(!this.furtherExps[j].exp.isSingular()) {
                    write('['+ index + ']');
                }
            }
            write(');}; return ' + retValArr + '})()');
        } else {
            for(var i = max; i >= 0; i--) {
                write('(');
            }
            this.val.compile(write, scope, 0, indentsHidden);
            for(var i = 0; i <= max; i++) {
                write(' ' + this.furtherExps[i].operator + ' ');
                this.furtherExps[i].exp.compile(write, scope, 0, indentsHidden);
                write(')');
            }
        }
    };
};