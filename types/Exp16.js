// Exp16           ::= 'new'? Exp17 Call?
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index; 
        var indentedBefore = env.inIndented;
        var entity = new Exp16();
        debug("Starting on exp16. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
        var foundNew = at('new');
        if(foundNew) {
            entity.prefix = env.last;
        }
        if(!at(env.Exp17)) {
            env.index = indexBefore; 
            env.inIndented = indentedBefore;
            return false;
        }
        entity.val = env.last;

        var foundCall = at(env.Call);
        if(foundCall) {
            entity.postfix = env.last;
        }
        env.last = entity;
        debug("Finalizing exp16 success. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
        return true;
    }
};

var Exp16 = function() {
    this.prefix = "";
    this.val = null;
    this.postfix = "";
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var addparens = (this.prefix.length > 0 || this.postfix.length > 0);
        var out = this.prefix + (addparens?"(":"") + this.val.toString(0, indLvlHidden) + (addparens?")":"") + this.postfix;
        return out;
    };
};