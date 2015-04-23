// SetAssign       ::= Exp AssignOp Exp
module.exports = {
    is: function(at, next, env, debug, previous) {
        var indexBefore = env.index;
        var entity = new SetAssign();
        var havePrevious = (typeof previous !== 'undefined');
        if(!havePrevious && !at(env.Exp)) {
            env.index = indexBefore;
            return false;
        }
        entity.leftexp = havePrevious?previous:env.last;
        if(!at(env.AssignOp)) {
            env.index = indexBefore;
            return false;
        }
        entity.operator = env.last;
        if(!at(env.Exp)) {
            env.index = indexBefore;
            return false;
        }
        entity.rightexp = env.last;

        env.last = entity;
        return true;
    }
};

var SetAssign = function() {
    this.leftexp = null;
    this.operator = null;
    this.rightexp = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "Assign -> leftExp: " + this.leftexp.toString(0, indLvlHidden);
        out += ", assignOp: " + this.operator;
        out += ", leftExp: " + this.rightexp.toString(0, indLvlHidden);
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        write(scope.ind(indents));
        leftexp.compile(write, scope, 0, indentsHidden);
        write(' ' + this.operator + ' ');
        rightexp.compile(write, scope, 0, indentsHidden);
    };
};