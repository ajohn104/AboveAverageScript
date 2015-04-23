// ConsumeStmt     ::= ExpList? '<-' Exp
module.exports = {      // Reduce this to just a single expression???
    is: function(at, next, env, debug, previous) {
        var indexBefore = env.index;
        var havePrevious = (typeof previous !== 'undefined');

        var haveExpList = (typeof env.initialExpList !== 'undefined');
        env.last = haveExpList?env.initialExpList:env.last;

        var listFound = !haveExpList && havePrevious && at(env.ExpList, previous);
        var entity = new ConsumeStmt();
        if(listFound || haveExpList) {
            entity.leftSideExps = env.last;
        }

        debug("ConsumeStmt: checking for '<-'. env.index:" + env.index + ", lexeme:" + env.parseTokens[env.index].lexeme);
        if(!at('<-')) {
            env.index = indexBefore;
            return false;
        }
        debug("ConsumeStmt: found '<-'. checking for Exp. env.index:" + env.index + ", lexeme:" + env.parseTokens[env.index].lexeme);

        if(!at(env.Exp)) {
            env.index = indexBefore;
            return false;
        }
        entity.rightSideExp = env.last;
        env.last = entity;
        debug("ConsumeStmt: found Exp. env.index:" + env.index + ", lexeme:" + env.parseTokens[env.index].lexeme);
        return true;
    }
};

// I changed the right side to just be an expression, and let it be a runtime error.
var ConsumeStmt = function() {
    this.leftSideExps = null;
    this.rightSideExp = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "ConsumeStmt ->\n";
        out += indents + "  consumer(s):";
        if(this.leftSideExps === null) {
            out += "local scope\n";
        } else {
            out += " [\n";
            for(var i = 0; i < this.leftSideExps.length; i++) {
                out += this.leftSideExps[i].toString(indentlevel + 2, indLvlHidden+2) + "\n";
            }
            out += indents + env.ind + "]\n";
        }
        out += indents + env.ind + "rightSideExp: " + this.rightSideExp.toString(0, indLvlHidden);
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        // Todo. For now this pretty much doesn't do anything. At all.
        write(scope.ind(indents));
        write("KUNSUMPSHUN");
    };
};