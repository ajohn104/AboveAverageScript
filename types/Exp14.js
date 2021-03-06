// Exp14           ::= PrefixOp? Exp15
module.exports = function(env, at, next, debug) {
    var Exp15, checkIndent, PrefixOp;
    return {
        loadData: function() {
            Exp15 = env.Exp15,
            checkIndent = env.checkIndent,
            PrefixOp = env.PrefixOp;
        },
        is: function() {
            var indexBefore = env.index; 
            var indentedBefore = env.inIndented;
            var entity = new Exp14();
            debug("Starting on exp14. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            if(at(PrefixOp)) {
                entity.prefix = env.last;
                checkIndent();
            }

            if(!at(Exp15)) {
                env.index = indexBefore; 
                env.inIndented = indentedBefore;
                return false;
            }
            entity.val = env.last;
            if(entity.prefix === "") {
                entity = entity.val;
            }
            env.last = /*(entity.prefix === "")?entity.val:*/entity;
            debug("Finalizing exp14 success. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            return true;
        }
    };
};

var Exp14 = function() {
    this.prefix = "";
    this.val = null;
    this.isSingular = function() {return this.val.isSingular()};
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = (this.prefix.length > 0?"(":"") + this.prefix + this.val.toString(0, indLvlHidden) + (this.prefix.length > 0?")":"");
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        if(!this.isSingular()) {
            var numId = scope.randId();
            write('(');
            this.val.compile(write, scope, 0, indentsHidden);
            write('.map(function(' + numId + ') { return ' + this.postfix + numId + ';})')
            write(')');
        } else {
            if(this.prefix !== "") {
                write('(' + this.prefix);
            }
            this.val.compile(write, scope, 0, indentsHidden);
            if(this.prefix !== "") {
                write(')');
            }
        }
    };
};