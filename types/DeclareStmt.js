// DeclareStmt     ::= 'let' (ExpList '=' (ObjInd | ExpList)) | (SetEqual (',' Indent Newline SetEqual (',' Newline SetEqual)* Dedent ) )
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;
        var entity;
        if(!at('let')) {
            env.index = indexBefore;
            return false;
        } 
        debug("DeclareStmt: found 'let'. env.index:" + env.index);
        var found = false;
        var indexMid = env.index;
        if(!found && at(env.ExpList)) {
            found = true;
            entity = new DeclareMultVar();
            entity.leftSideExps = env.last;
            if(!(at('=') && (at(env.ObjInd) || at(env.ExpList)))) {
                found = false;
                env.index = indexMid;
            }
            if(env.isArray(env.last)) { // Note: this is when you have something like let x, y = a, b  (or just let x = a)
                entity.rightSideExps = env.last;
            } else { // Note: this is when you have something like let x = a, y = b
                entity.rightSideExps.push(env.last);
            } 
        }
        debug("DeclareStmt: found ExpList: " + found + ". env.index:" + env.index);

        if(!found && at(env.SetEqual)) {
            debug("DeclareStmt: checking for SetEqual stuff. env.index:" + env.index);
            found = true;
            entity = new DeclareMultiLine();
            entity.declarepairs.push(env.last);
            if(found && !at(',')) {
                found = false;
                env.index = indexMid;
            }
            if(found && !at(env.Indent)) {
                found = false;
                env.index = indexMid;
            }
            if(found && !at(env.Newline)) {
                found = false;
                env.index = indexMid;
            }
            if(found && !at(env.SetEqual)) {
                found = false;
                env.index = indexMid;
            }
            entity.declarepairs.push(env.last);
            indexMid = env.index;
            while(found && at(',') && at(env.Newline) && at(env.SetEqual)) {
                entity.declarepairs.push(env.last);
                indexMid = env.index;
            }
            env.index = indexMid;

            if(!at(env.Dedent)){
                found = false;
                env.index = indexMid;
            }
        }

        debug("DeclareStmt: passed setequal. found: " + found + ". env.index:" + env.index);
        if(!found) {
            env.index = indexBefore;
            return false;
        }
        env.last = entity;
        return true;
    }
};

var DeclareMultVar = function() {
    this.leftSideExps = [];
    this.rightSideExps = [];
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "DeclareMultVar ->\n";
        out += indents + "  leftSideExps: [\n";
        for(var i = 0; i < this.leftSideExps.length; i++) {
            out += this.leftSideExps[i].toString(indentlevel + 2, indLvlHidden + 2) + "\n";
        }
        out += indents + "  ]\n";
        out += indents + "  rightSideExps: [\n";
        for(var j = 0; j < this.rightSideExps.length; j++) {
            out += this.rightSideExps[j].toString(indentlevel +2, indLvlHidden + 2) + "\n";
        }
        out += indents + "  ]";
        return out;
    };
};

var DeclareMultiLine = function() {
    this.declarepairs = [];
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "DeclareMultiLine -> stmts: [\n";
        for(var i = 0; i < this.declarepairs.length; i++) {
            var pair = this.declarepairs[i];
            out += pair.toString(indentlevel+1, indLvlHidden + 1) + "\n";
        }
        out += indents + "]";
        return out;
    };
};