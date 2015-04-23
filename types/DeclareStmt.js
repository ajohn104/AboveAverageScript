// DeclareStmt     ::= 'let' (Id (',' Id)* '=' (ObjInd | ExpList)) | (SetEqual (',' Indent Newline SetEqual (',' Newline SetEqual)* Dedent ) )
module.exports = function(env, at, next, debug) {
    var ExpList, ObjInd, SetEqual, Id,
        Indent, Newline, Dedent, isArray;
    return {
        loadData: function() {
            Id = env.Id,
            ExpList = env.ExpList,
            ObjInd = env.ObjInd,
            SetEqual = env.SetEqual,
            Indent = env.Indent,
            Newline = env.Newline,
            Dedent = env.Dedent,
            isArray = env.isArray;
        },

        is: function() {
            var indexBefore = env.index;
            var entity;
            if(!at('let')) {
                env.index = indexBefore;
                return false;
            } 
            debug("DeclareStmt: found 'let'. env.index:" + env.index);
            var found = false;
            var indexMid = env.index;
            var ids = [];
            if(at(Id)) {
                found = true;
                ids.push(env.last);
                while(at(',')) {
                    if(!at(Id)) {
                        env.index = indexMid;
                        found = false;
                        break;
                    }
                    ids.push(env.last);
                }
                if(found) {
                    entity = new DeclareMultVar();
                    entity.leftSideExps = ids;
                    if(!(at('=') && (at(ObjInd) || at(ExpList)))) {
                        found = false;
                        env.index = indexMid;
                    }
                    if(isArray(env.last)) { // Note: this is when you have something like let x, y = a, b  (or just let x = a)
                        entity.rightSideExps = env.last;
                    } else { // Note: this is when you have something like let x = a, y = b
                        entity.rightSideExps.push(env.last);
                    } 
                }
            }
            debug("DeclareStmt: found ExpList: " + found + ". env.index:" + env.index);

            if(!found && at(SetEqual)) {
                debug("DeclareStmt: checking for SetEqual stuff. env.index:" + env.index);
                found = true;
                entity = new DeclareMultiLine();
                entity.declarepairs.push(env.last);
                if(found && !at(',')) {
                    found = false;
                    env.index = indexMid;
                }
                if(found && !at(Indent)) {
                    found = false;
                    env.index = indexMid;
                }
                if(found && !at(Newline)) {
                    found = false;
                    env.index = indexMid;
                }
                if(found && !at(SetEqual)) {
                    found = false;
                    env.index = indexMid;
                }
                entity.declarepairs.push(env.last);
                indexMid = env.index;
                while(found && at(',') && at(Newline) && at(SetEqual)) {
                    entity.declarepairs.push(env.last);
                    indexMid = env.index;
                }
                env.index = indexMid;

                if(!at(Dedent)){
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
};

var DeclareMultVar = function() {
    this.leftSideExps = [];
    this.rightSideExps = [];
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "DeclareMultVar ->\n";
        out += indents + env.ind + "leftSideExps: [\n";
        for(var i = 0; i < this.leftSideExps.length; i++) {
            out += this.leftSideExps[i].toString(indentlevel + 2, indLvlHidden + 2) + "\n";
        }
        out += indents + env.ind + "],\n";
        out += indents + env.ind + "rightSideExps: [\n";
        for(var j = 0; j < this.rightSideExps.length; j++) {
            out += this.rightSideExps[j].toString(indentlevel +2, indLvlHidden + 2) + "\n";
        }
        out += indents + env.ind + "]";
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        // Todo. For now this is taking a REALLY basic approach of just a single variable at a time.
        write(scope.ind(indents) + 'var ');
        this.leftSideExps[0].compile(write, scope, 0, indentsHidden);
        write(' = ');
        this.rightSideExps[0].compile(write, scope, 0, indentsHidden);
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
            out += pair.toString(indentlevel+1, indLvlHidden + 1) + ",\n";
        }
        out = out.substring(0 , out.length-2) + "\n" + indents + "]";
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        write(scope.ind(indents) + 'var ');
        this.declarepairs[0].compile(write, scope, 0, indentsHidden);
        for(var i = 1; i < len(this.declarepairs); i++) {
            write(',\n');
            this.declarepairs[i].compile(write, scope, indents+1, indentsHidden+1);
        }
    };
};