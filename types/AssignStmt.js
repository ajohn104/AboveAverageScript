// AssignStmt      ::= (ExpList AssignOp (ObjInd | ExpList)) | (SetAssign (',' Indent Newline SetAssign (',' Newline SetAssign)* Dedent ) )
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;

        var found = false;
        var indexMid = env.index;
        var entity;
        if(!found && at(env.ExpList)) {
            found = true;
            entity = new AssignMultVar();
            entity.leftSideExps = env.last;
            if(!at(env.AssignOp)) {
                found = false;
                env.index = indexMid;
            }
            entity.operator = env.last;
            if(!(found && (at(env.ObjInd) || at(env.ExpList)))) {
                found = false;
                env.index = indexMid;
            }
            if(env.isArray(env.last)) {
                entity.rightSideExps = env.last;
            } else {
                entity.rightSideExps.push(env.last);
            }
        }

        if(!found && at(env.SetAssign)) {
            found = true;
            entity = new AssignMultiLine();
            entity.assignpairs.push(env.last);
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
            if(found && !at(env.SetAssign)) {
                found = false;
                env.index = indexMid;
            }
            entity.assignpairs.push(env.last);
            indexMid = env.index;
            while(found && at(',') && at(env.Newline) && at(env.SetAssign)) {
                entity.assignpairs.push(env.last);
                indexMid = env.index;
            }
            env.index = indexMid;

            if(!at(env.Dedent)){
                found = false;
                env.index = indexMid;
            }
        }
        if(!found) {
            env.index = indexBefore;
            return false;
        }
        env.last = entity;
        return true;
    }
};

var AssignMultVar = function() {
    this.leftSideExps = [];
    this.rightSideExps = [];
    this.operator;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
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
        var indents = env.indents(indentlevel);
        var out = indents + "AssignMultiLine -> stmts: [\n";
        for(var i = 0; i < this.assignpairs.length; i++) {
            var pair = this.assignpairs[i];
            out += pair.left.toString(indentlevel + 1, indLvlHidden + 1) + pair.operator + pair.right.toString(0, indLvlHidden) + "\n";
        }
        out += indents + "]";
        return out;
    };
};