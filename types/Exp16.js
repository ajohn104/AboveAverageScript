// Exp16           ::= 'new'? Exp17
module.exports = function(env, at, next, debug) {
    var Exp17, Call;
    return {
        loadData: function() {
            Exp17 = env.Exp17;
        },
        is: function() {
            var indexBefore = env.index; 
            var indentedBefore = env.inIndented;
            var entity = new Exp16();
            debug("Starting on exp16. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            if(at('new')) {
                entity.prefix = env.last;
            }
                
            if(!at(Exp17)) {
                env.index = indexBefore;
                env.inIndented = indentedBefore;
                return false;
            }
            entity.val = env.last;
            env.last = (entity.prefix === "")?entity.val:entity;
            debug("Finalizing exp16 success. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            return true;
        }
    };
};

var Exp16 = function() {
    this.prefix = "";
    this.val = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = this.prefix + this.val.toString(0, indLvlHidden);// + this.call.toString(0, indLvlHidden);
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        if(this.prefix !== "") {
            write('(' + this.prefix + ' ');
        }
        this.val.compile(write, scope, 0, indentsHidden);
        if(this.prefix !== "") {
            write(')'); // For now, I'm letting Call be a user problem, because it's getting eaten up by Exp17
        }
    };
};