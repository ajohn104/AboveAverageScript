// Exp16           ::= 'new'? Exp17 Call?
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index; 
        var indentedBefore = envir.inIndented;
        var entity = new Exp16();
        debug("Starting on exp16. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        var foundNew = at('new');
        if(foundNew) {
            entity.prefix = envir.last;
        }
        if(!at(envir.Exp17)) {
            envir.index = indexBefore; 
            envir.inIndented = indentedBefore;
            return false;
        }
        entity.val = envir.last;

        var foundCall = at(envir.Call);
        if(foundCall) {
            entity.postfix = envir.last;
        }
        envir.last = entity;
        debug("Finalizing exp16 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};

var Exp16 = function() {
    this.prefix = "";
    this.val = null;
    this.postfix = "";
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var addparens = (this.prefix.length > 0 || this.postfix.length > 0);
        var out = this.prefix + (addparens?"(":"") + this.val.toString(0, indLvlHidden) + (addparens?")":"") + this.postfix;
        return out;
    };
};