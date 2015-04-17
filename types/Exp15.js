// Exp15           ::= Exp16 PostfixOp?
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index; 
        var indentedBefore = env.inIndented;
        var entity = new Exp15();
        debug("Starting on exp15. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
        if(!at(env.Exp16)) {
            env.index = indexBefore; 
            env.inIndented = indentedBefore;
            return false;
        }
        entity.val = env.last;
        env.checkIndent();

        var foundOp = at(env.PostfixOp);
        if(foundOp) {
            entity.postfix = env.last;
        }

        env.last = entity;
        debug("Finalizing exp15 success. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
        return true;
    }
};

var Exp15 = function() {
    this.val = null;
    this.postfix = "";
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = (this.postfix.length > 0?"(":"") + this.val.toString(0, indLvlHidden) + this.postfix + (this.postfix.length > 0?")":"");
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        if(this.postfix !== "") {
            write('(');
        }
        this.val.compile(write, scope, 0, indentsHidden);
        if(this.postfix !== "") {
            write(')' + this.postfix);
        }
    };
};