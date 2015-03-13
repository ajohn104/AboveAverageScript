// RegExp          ::= '\/[^\/\\]+(?:\\.[^\/\\]*)*\/[igm]{0,3}'
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        if(parseTokens[envir.index].kind !== 'RegExpLit') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;
        return true;
    }
};