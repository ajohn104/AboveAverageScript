// StringLit       ::= '\"[^\"\\]*(?:\\.[^\"\\]*)*\"|\'[^\'\\]*(?:\\.[^\'\\]*)*\''
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        if(envir.parseTokens[envir.index].kind !== 'StrLit') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;
        return true;
    }
};