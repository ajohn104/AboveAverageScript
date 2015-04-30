// SetEqual        ::= Id '=' Exp
module.exports = function(env, at, next, debug) {
    var Id, Exp;
    return {
        loadData: function() {
            Id = env.Id;
            Exp = env.Exp;
        },
        is: function(previous) {
            var indexBefore = env.index;
            var entity = new SetEqual();
            var havePrevious = (typeof previous !== 'undefined');
            if(!havePrevious && !at(Id)) {
                env.index = indexBefore;
                return false;
            }
            entity.leftexp = havePrevious?previous:env.last;
            if(!at('=')) {
                env.index = indexBefore;
                return false;
            }
            if(!at(Exp)) {
                env.index = indexBefore;
                return false;
            }
            entity.rightexp = env.last;

            env.last = entity;
            return true;
        }
    };
};

var SetEqual = function() {
    this.leftexp = null;
    this.rightexp = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "Declare -> leftExp: " + this.leftexp.toString(0, indLvlHidden);
        out += ", rightExp: " + this.rightexp.toString(0, indLvlHidden);
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        write(scope.ind(indents));
        this.leftexp.compile(write, scope, 0, indentsHidden);
        write(' = ');
        this.rightexp.compile(write, scope, 0, indentsHidden);
    };
};