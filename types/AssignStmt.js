// AssignStmt      ::= (ExpList AssignOp (ObjInd | ExpList)) | (SetAssign (',' Indent Newline SetAssign (',' Newline SetAssign)* Dedent ) )
module.exports = function(env, at, next, debug) {
    var ExpList, AssignOp, ObjInd, SetAssign, 
        Indent, Newline, Dedent, isArray;
    return {
        loadData: function() {
            ExpList = env.ExpList,
            AssignOp = env.AssignOp,
            ObjInd = env.ObjInd,
            SetAssign = env.SetAssign,
            Indent = env.Indent,
            Newline = env.Newline,
            Dedent = env.Dedent,
            isArray = env.isArray;
        },
        is: function(previous) {
            var indexBefore = env.index;

            var found = false;
            var indexMid = env.index;
            var entity;
            var havePrevious = (typeof previous !== 'undefined');

            var foundExpList = false;

            if(!found && at(ExpList, previous)) {
                foundExpList = true;
                found = true;
                entity = new AssignMultVar();
                entity.leftSideExps = env.last;
                env.initialExpList = env.last;
                if(!at(AssignOp)) {
                    found = false;
                    env.index = indexMid;
                }
                entity.operator = env.last;
                if(!(found && (at(ObjInd) || at(ExpList)))) {
                    found = false;
                    env.index = indexMid;
                }
                if(isArray(env.last)) {
                    entity.rightSideExps = env.last;
                } else {
                    entity.rightSideExps.push(env.last);
                }
            }

            // Yeah I know this looks terrible but it makes things faster
            if(foundExpList && env.initialExpList.length === 1 && !found && at(SetAssign, previous)) {
                found = true;
                entity = new AssignMultiLine();
                entity.assignpairs.push(env.last);
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
                if(found && !at(SetAssign)) {
                    found = false;
                    env.index = indexMid;
                }
                entity.assignpairs.push(env.last);
                indexMid = env.index;
                while(found && at(',') && at(Newline) && at(SetAssign)) {
                    entity.assignpairs.push(env.last);
                    indexMid = env.index;
                }
                env.index = indexMid;

                if(!at(Dedent)){
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
};

var AssignMultVar = function() {
    this.leftSideExps = [];
    this.rightSideExps = [];
    this.operator;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "AssignMultVar ->\n";
        out += indents + env.ind + "leftSideExps: [\n";
        for(var i = 0; i < this.leftSideExps.length; i++) {
            out += this.leftSideExps[i].toString(indentlevel + 2, indLvlHidden + 2) + "\n";
        }
        out += indents + env.ind + "],\n";
        out += indents + env.ind + "operator: " + this.operator + ",\n";
        out += indents + env.ind + "rightSideExps: [\n";
        for(var j = 0; j < this.rightSideExps.length; j++) {
            out += this.rightSideExps[j].toString(indentlevel + 2, indLvlHidden + 2) + "\n";
        }
        out += indents + env.ind + "]";
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        // Todo. For now this is taking a REALLY basic approach of just a single variable at a time.
        write(scope.ind(indents));
        this.leftSideExps[0].compile(write, scope, 0, indentsHidden);
        write(' ' + this.operator + ' ');
        this.rightSideExps[0].compile(write, scope, 0, indentsHidden);
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
            out += pair.toString(indentlevel+1, indLvlHidden + 1) + ",\n";
        }
        out = out.substring(0 , out.length-2) + "\n" + indents + "]";
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        this.assignpairs[0].compile(write, scope, indents, indentsHidden);
        for(var i = 1; i < len(this.assignpairs); i++) {
            write(',\n');
            this.assignpairs[i].compile(write, scope, indents+1, indentsHidden+1);
        }
    };
};