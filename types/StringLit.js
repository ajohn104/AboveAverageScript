// StringLit       ::= '\"[^\"\\]*(?:\\.[^\"\\]*)*\"|\'[^\'\\]*(?:\\.[^\'\\]*)*\''
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        if(parseTokens[envir.index].kind !== 'StrLit') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;
        return true;
    }
};