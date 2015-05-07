// Exp15           ::= Exp16 PostfixOp?
module.exports = function(env, at, next, debug) {
    var Exp16, checkIndent, PostfixOp;
    return {
        loadData: function() {
            Exp16 = env.Exp16,
            checkIndent = env.checkIndent,
            PostfixOp = env.PostfixOp;
        },
        is: function() {
            var indexBefore = env.index; 
            var indentedBefore = env.inIndented;
            var entity = new Exp15();
            debug("Starting on exp15. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            if(!at(Exp16)) {
                env.index = indexBefore; 
                env.inIndented = indentedBefore;
                return false;
            }
            entity.val = env.last;
            checkIndent();

            var foundOp = at(PostfixOp);
            if(foundOp) {
                entity.postfix = env.last;
            }
            if(entity.postfix === "") {
                entity = entity.val;
            }
            env.last = /*(entity.postfix === "")?entity.val:*/entity;
            debug("Finalizing exp15 success. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            return true;
        }
    };
};

var Exp15 = function() {
    this.val = null;
    this.postfix = "";
    this.isSingular = function() { return this.val.isSingular();};
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = (this.postfix.length > 0?"(":"") + this.val.toString(0, indLvlHidden) + this.postfix + (this.postfix.length > 0?")":"");
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        if(!this.isSingular()) {
            var numId = scope.randId();
            write('(');
            this.val.compile(write, scope, 0, indentsHidden);
            write('.map(function(' + numId + ') { return ' + numId + this.postfix + ';})')
            write(')');
        } else {
            if(this.postfix !== "") {
                write('(');
            }
            this.val.compile(write, scope, 0, indentsHidden);
            if(this.postfix !== "") {
                write(')' + this.postfix);
            }
        }
    };
};