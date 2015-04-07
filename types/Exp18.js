// Exp18           ::= Id | BoolLit | IntLit | StringLit | '(' Exp Newline? ')' | Func | ArrayLit | ObjectInline | This | RegExpLit
module.exports = {
    is: function(at, next, envir, debug) {
        debug("Starting on exp18. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        var indexBefore = envir.index; 
        var indentedBefore = envir.inIndented;
        var isParenthesizedExpr = false;
        var entity = new Exp18();
        if(at('(')) {
            if(!at(envir.Exp)) {
                envir.index = indexBefore; 
                envir.inIndented = indentedBefore;
                isParenthesizedExpr = false;
            }
            entity.val = envir.last;
            debug("Found exp within possible ParenthesizedExpr. Looking for ')'. envir.index:" + envir.index);

            debug("Checking for newline. envir.index:" + envir.index);
            if(at(envir.Newline)) {
                debug("Found newline. envir.index:" + envir.index);
            } // I think this is it.

            if(!at(')')) {
                envir.index = indexBefore; 
                envir.inIndented = indentedBefore;
                isParenthesizedExpr = false;
            }
            debug("Found ')'. Completed ParenthesizedExpr. envir.index:" + envir.index);
            isParenthesizedExpr = true;
        }
        var found = isParenthesizedExpr
                 || at(envir.Id)
                 || at(envir.BoolLit)
                 || at(envir.IntLit)
                 || at(envir.StringLit)
                 || at(envir.Func)
                 || at(envir.ArrayLit)
                 || at(envir.ObjectInline)
                 || at(envir.This)
                 || at(envir.RegExpLit);
        var accessIndex = envir.index;
        if(entity.val === null) {
            entity.val = envir.last;
        }
        if(envir.index === 0) accessIndex = 0;
        envir.last = entity;
        debug("Finalizing exp18, found:" + found + ", envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[accessIndex].lexeme);
        return found;
    }
};

var Exp18 = function() {
    this.val = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + this.val.toString(indentlevel+1, indLvlHidden+1);
        return out;
    };
};