// Exp18           ::= Id | BoolLit | IntLit | StringLit | '(' Exp Newline? ')' | Func | ArrayLit | ObjectInline | This | RegExpLit
module.exports = {
    is: function(at, next, env, debug) {
        debug("Starting on exp18. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
        var indexBefore = env.index; 
        var indentedBefore = env.inIndented;
        var isParenthesizedExpr = false;
        var entity = new Exp18();
        if(at('(') && at(env.Exp)) {
            entity.val = env.last;
            debug("Found exp within possible ParenthesizedExpr. Looking for ')'. env.index:" + env.index);

            debug("Checking for newline. env.index:" + env.index);
            if(at(env.Newline)) {
                debug("Found newline. env.index:" + env.index);
            } // I think this is it.

            if(!at(')')) {
                env.index = indexBefore; 
                env.inIndented = indentedBefore;
                isParenthesizedExpr = false;
            }
            debug("Found ')'. Completed ParenthesizedExpr. env.index:" + env.index);
            isParenthesizedExpr = true;
            entity.isParenthesizedExpr = true;
        } else {
            env.index = indexBefore; 
            env.inIndented = indentedBefore;
            isParenthesizedExpr = false;
        }
        var found = isParenthesizedExpr
                 || at(env.Id)
                 || at(env.BoolLit)
                 || at(env.IntLit)
                 || at(env.StringLit)
                 || at(env.Func)
                 || at(env.ArrayLit)
                 || at(env.ObjectInline)
                 || at(env.This)
                 || at(env.RegExpLit);
        var accessIndex = env.index;
        if(entity.val === null) {
            entity.val = env.last;
        }
        if(env.index === 0) accessIndex = 0;
        env.last = entity;
        debug("Finalizing exp18, found:" + found + ", env.index:" + env.index + ', lexeme: ' + env.parseTokens[accessIndex].lexeme);
        return found;
    }
};

var Exp18 = function() {
    this.val = null;
    this.isParenthesizedExpr = false;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + this.val.toString(indentlevel, indLvlHidden);
        return out;
    };
};