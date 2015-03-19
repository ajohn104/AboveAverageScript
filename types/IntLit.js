// IntLit          ::= '[+-]?((0x[a-fA-F0-9]+)|(\d+(\.\d+)?([eE][+-]?\d+)?))'
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        if(envir.parseTokens[envir.index].kind !== 'IntLit') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;
        return true;
    }
};