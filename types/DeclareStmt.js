// DeclareStmt     ::= 'let' (ExpList '=' (ObjInd | ExpList)) | (SetEqual (',' Indent Newline SetEqual (',' Newline SetEqual)* Dedent ) )
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity;
        if(!at('let')) {
            envir.index = indexBefore;
            return false;
        } 
        debug("DeclareStmt: found 'let'. envir.index:" + envir.index);
        var found = false;
        var indexMid = envir.index;
        if(!found && at(envir.ExpList)) {
            found = true;
            entity = new DeclareMultVar();
            entity.leftSideExps = envir.last;
            if(!(at('=') && (at(envir.ObjInd) || at(envir.ExpList)))) {
                found = false;
                envir.index = indexMid;
            }
            if(envir.isArray(envir.last)) {
                entity.rightSideExps = envir.last;
            } else {
                entity.rightSideExps.push(envir.last);
            } 
        }
        debug("DeclareStmt: found ExpList: " + found + ". envir.index:" + envir.index);

        if(!found && at(envir.SetEqual)) {
            debug("DeclareStmt: checking for SetEqual stuff. envir.index:" + envir.index);
            found = true;
            entity = new DeclareMultiLine();
            entity.declarepairs.push(envir.last);
            if(found && !at(',')) {
                found = false;
                envir.index = indexMid;
            }
            if(found && !at(envir.Indent)) {
                found = false;
                envir.index = indexMid;
            }
            if(found && !at(envir.Newline)) {
                found = false;
                envir.index = indexMid;
            }
            if(found && !at(envir.SetEqual)) {
                found = false;
                envir.index = indexMid;
            }
            entity.declarepairs.push(envir.last);
            indexMid = envir.index;
            while(found && at(',') && at(envir.Newline) && at(envir.SetEqual)) {
                entity.declarepairs.push(envir.last);
                indexMid = envir.index;
            }
            envir.index = indexMid;

            if(!at(envir.Dedent)){
                found = false;
                envir.index = indexMid;
            }
        }

        debug("DeclareStmt: passed setequal. found: " + found + ". envir.index:" + envir.index);
        if(!found) {
            envir.index = indexBefore;
            return false;
        }
        envir.last = entity;
        return true;
    }
};

var DeclareMultVar = function() {
    this.leftSideExps = [];
    this.rightSideExps = [];
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "DeclareMultVar ->\n";
        out += indents + "  leftSideExps: [\n";
        for(var i = 0; i < this.leftSideExps.length; i++) {
            out += this.leftSideExps[i].toString(indentlevel + 2) + "\n";
        }
        out += indents + "  ]\n";
        out += indents + "  rightSideExps: [\n";
        for(var j = 0; j < this.rightSideExps.length; j++) {
            out += this.rightSideExps[j].toString(indentlevel + 2) + "\n";
        }
        out += indents + "  ]\n" + indents + "]\n";
        return out;
    };
};

var DeclareMultiLine = function() {
    this.declarepairs = [];
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "DeclareMultiLine -> stmts: [\n";
        for(var i = 0; i < this.declarepairs.length; i++) {
            var pair = this.declarepairs[i];
            out += pair.toString(indentlevel+1) + "\n";
        }
        out += indents + "]";
        return out;
    };
};