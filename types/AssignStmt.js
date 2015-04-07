// AssignStmt      ::= (ExpList AssignOp (ObjInd | ExpList)) | (SetAssign (',' Indent Newline SetAssign (',' Newline SetAssign)* Dedent ) )
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;

        var found = false;
        var indexMid = envir.index;
        var entity;
        if(!found && at(envir.ExpList)) {
            found = true;
            entity = new AssignMultVar();
            entity.leftSideExps = envir.last;
            if(!at(envir.AssignOp)) {
                found = false;
                envir.index = indexMid;
            }
            entity.operator = envir.last;
            if(!(found && (at(envir.ObjInd) || at(envir.ExpList)))) {
                found = false;
                envir.index = indexMid;
            }
            if(envir.isArray(envir.last)) {
                entity.rightSideExps = envir.last;
            } else {
                entity.rightSideExps.push(envir.last);
            }
        }

        if(!found && at(envir.SetAssign)) {
            found = true;
            entity = new AssignMultiLine();
            entity.assignpairs.push(envir.last);
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
            if(found && !at(envir.SetAssign)) {
                found = false;
                envir.index = indexMid;
            }
            entity.assignpairs.push(envir.last);
            indexMid = envir.index;
            while(found && at(',') && at(envir.Newline) && at(envir.SetAssign)) {
                entity.assignpairs.push(envir.last);
                indexMid = envir.index;
            }
            envir.index = indexMid;

            if(!at(envir.Dedent)){
                found = false;
                envir.index = indexMid;
            }
        }
        if(!found) {
            envir.index = indexBefore;
            return false;
        }
        envir.last = entity;
        return true;
    }
};

var AssignMultVar = function() {
    this.leftSideExps = [];
    this.rightSideExps = [];
    this.operator;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "AssignMultVar ->\n";
        out += indents + "  leftSideExps: [\n";
        for(var i = 0; i < this.leftSideExps.length; i++) {
            out += this.leftSideExps[i].toString(indentlevel + 2, indLvlHidden + 2) + "\n";
        }
        out += indents + "  ],\n";
        out += indents + "  operator: " + this.operator + ",\n";
        out += indents + "  rightSideExps: [\n";
        for(var j = 0; j < this.rightSideExps.length; j++) {
            out += this.rightSideExps[j].toString(indentlevel + 2, indLvlHidden + 2) + "\n";
        }
        out += indents + "  ]";
        return out;
    };
};

var AssignMultiLine = function() {
    this.assignpairs = [];
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "AssignMultiLine -> stmts: [\n";
        for(var i = 0; i < this.assignpairs.length; i++) {
            var pair = this.assignpairs[i];
            out += pair.left.toString(indentlevel + 1, indLvlHidden + 1) + pair.operator + pair.right.toString(0, indLvlHidden) + "\n";
        }
        out += indents + "]";
        return out;
    };
};