// ControlStmt     ::= 'stop' | 'skip'
module.exports = {
    is: function(at, next, envir, debug) {
        var controls = ['stop', 'skip'];
        var entity;
        var foundControl = at(controls);
        if(foundControl) {
            entity = new ControlStmt();
            entity.controlWord = envir.last;
            envir.last = entity;
        }
        return foundControl;
    }
};

var ControlStmt = function() {
    this.controlWord = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + this.controlWord + "\n";
        return out;
    };
};