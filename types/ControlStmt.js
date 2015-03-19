// ControlStmt     ::= 'stop' | 'skip'
module.exports = {
    is: function(at, next, envir, debug) {
        var controls = ['stop', 'skip'];
        return at(controls);
    }
};