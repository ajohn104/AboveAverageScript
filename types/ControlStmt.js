// ControlStmt     ::= 'stop' | 'skip'
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        var controls = ['stop', 'skip'];
        if(controls.indexOf(parseTokens[envir.index].lexeme) === -1) {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;

        return true;
    }
};