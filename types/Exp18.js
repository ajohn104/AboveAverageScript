// Exp18           ::= Id | BoolLit | IntLit | StringLit | '(' Exp2 Newline? ')' | Func | ArrayLit | ObjectInline | This | RegExpLit
module.exports = function(env, at, next, debug) {
    var Id, BoolLit, IntLit, StringLit, Exp2, Newline, 
        Func, ArrayLit, ObjectInline, This, RegExpLit;
    return {
        loadData: function() {
            Id = env.Id,
            BoolLit = env.BoolLit,
            IntLit = env.IntLit,
            StringLit = env.StringLit,
            Exp2 = env.Exp2,
            Newline = env.Newline,
            Func = env.Func,
            ArrayLit = env.ArrayLit,
            ObjectInline = env.ObjectInline,
            This = env.This,
            RegExpLit = env.RegExpLit;
        },
        is: function() {
            debug("Starting on exp18. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            var indexBefore = env.index; 
            var indentedBefore = env.inIndented;
            var isParenthesizedExpr = false;
            var entity = null;
            if(at('(') && at(Exp2)) {
                entity = env.last;
                debug("Found exp within possible ParenthesizedExpr. Looking for ')'. env.index:" + env.index);

                debug("Checking for newline. env.index:" + env.index);
                if(at(Newline)) {
                    debug("Found newline. env.index:" + env.index);
                } // I think this is it.

                if(!at(')')) {
                    env.index = indexBefore; 
                    env.inIndented = indentedBefore;
                    isParenthesizedExpr = false;
                }
                debug("Found ')'. Completed ParenthesizedExpr. env.index:" + env.index);
                isParenthesizedExpr = true;
                entity.isEnclosed = true;
            } else {
                env.index = indexBefore; 
                env.inIndented = indentedBefore;
                isParenthesizedExpr = false;
            }
            var found = isParenthesizedExpr
                     || at(Id)
                     || at(BoolLit)
                     || at(IntLit)
                     || at(StringLit)
                     || at(Func)
                     || at(ArrayLit)
                     || at(ObjectInline)
                     || at(This)
                     || at(RegExpLit);
            var accessIndex = env.index;
            if(entity === null) {
                entity = env.last;
            }
            if(env.index === 0) accessIndex = 0;
            env.last = entity;
            debug("Finalizing exp18, found:" + found + ", env.index:" + env.index + ', lexeme: ' + env.parseTokens[accessIndex].lexeme);
            return found;
        }
    };
};

var Exp18 = function() { // This is actually no longer used. I completely phased it out.
    this.val = null;
    this.isParenthesizedExpr = false;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + this.val.toString(indentlevel, indLvlHidden);
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        if(this.isParenthesizedExpr) {
            write('(');
        }
        if(this.val === '_') {
            write('this');
        } else {
            this.val.compile(write, scope, 0, indentsHidden);
        }
        if(this.isParenthesizedExpr) {
            write(')');
        }
    };
};