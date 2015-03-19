// EOF             ::= '@EOF'
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        debug("At of of file");
        if(envir.parseTokens[envir.index].kind !== 'EndOfFile') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;

        return true;
    }
};