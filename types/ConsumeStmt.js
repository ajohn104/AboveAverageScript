// ConsumeStmt     ::= ExpList? '<-' Exp
module.exports = {      // Reduce this to just a single expression???
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;

        var listFound = at(envir.ExpList);
        var entity = new ConsumeStmt();
        if(listFound) {
            entity.leftSideExps = envir.last;
        }

        debug("ConsumeStmt: checking for '<-'. envir.index:" + envir.index + ", lexeme:" + envir.parseTokens[envir.index].lexeme);
        if(!at('<-')) {
            envir.index = indexBefore;
            return false;
        }
        debug("ConsumeStmt: found '<-'. checking for Exp. envir.index:" + envir.index + ", lexeme:" + envir.parseTokens[envir.index].lexeme);

        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }
        entity.rightSideExp = envir.last;
        envir.last = entity;
        debug("ConsumeStmt: found Exp. envir.index:" + envir.index + ", lexeme:" + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};

// I changed the right side to just be an expression, and let it be a runtime error.
var ConsumeStmt = function() {
    this.leftSideExps = null;
    this.rightSideExp = null;
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "ConsumeStmt ->\n";
        out += indents + "    consumer:";
        if(this.leftSideExps === null) {
            out += "local scope\n";
        } else {
            out += " [\n";
            for(var i = 0; i < this.leftSideExps.length; i++) {
                out += this.leftSideExps[i].toString(indentlevel + 2);
            }
            out += indents + "    ]\n";
        }
        out += indents + "    left side exp: " + rightSideExp.toString() + "\n";
        return out;
    };
};