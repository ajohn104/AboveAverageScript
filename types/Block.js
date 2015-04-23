// Block           ::= (Newline Stmt)*
module.exports = function(env, at, next, debug) {
    var Newline, Stmt;
    return {
        loadData: function() {
            Newline = env.Newline,
            Stmt = env.Stmt;
        },
        is: function() {
            var indexBefore = env.index;
            var entity = new Block();
            debug("Beginning block search. env.index:" + env.index + " \n");
            debug("Current token:");
            debug(env.parseTokens[env.index]);
            debug("Previous token:");
            debug(env.parseTokens[env.index-1]);
            debug('\n');
            var indexMid = env.index;
            while(at(Newline)) {
                if(!at(Stmt)) {
                    debug("Block search stopped.\n");
                    env.index = indexMid;
                    break;
                }
                entity.stmts.push(env.last);
                indexMid = env.index;
            }
            
            debug("Ending block search. env.index:" + env.index + " \n");
            debug("Current token is now:");
            debug(env.parseTokens[env.index]);
            debug('\n');
            env.last = entity;
            return true;
        } 
    };
};

var Block = function() {
    this.stmts = [];
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "Block -> stmts: [\n";
        for(var i = 0; i < this.stmts.length; i++) {
            out += this.stmts[i].toString(indentlevel + 1, indLvlHidden+1) + "\n";
        }
        out += indents + "]";
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        for(var i = 0; i < len(this.stmts); i++) {
            this.stmts[i].compile(write, scope, indents, indentsHidden);
            write(';\n');
        }
    };
};