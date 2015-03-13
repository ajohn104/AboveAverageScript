// IntLit          ::= '[+-]?((0x[a-fA-F0-9]+)|(\d+(\.\d+)?([eE][+-]?\d+)?))'
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        if(parseTokens[envir.index].kind !== 'IntLit') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;
        return true;
    }
};