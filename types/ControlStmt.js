// ControlStmt     ::= 'stop' | 'skip'
module.exports = function(env, at, next, debug) {
    var controls = ['stop', 'skip'];
    return {
        loadData: function() {},
        is: function() {
            var entity;
            var foundControl = at(controls);
            if(foundControl) {
                entity = new ControlStmt();
                entity.controlWord = env.last;
                env.last = entity;
            }
            return foundControl;
        }
    };
};

var ControlStmt = function() {
    this.controlWord = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + this.controlWord;
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        write(scope.env(indents) + this.controlWord);
    };
};