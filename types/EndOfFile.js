// EOF             ::= '@EOF'
module.exports = function(env, at, next, debug) {
    return {
        loadData: function() {},
        is: function() {
            if(env.parseTokens[env.index].kind !== 'EndOfFile') {
                return false;
            }
            env.index++;
            debug("At of of file");
            return true;
        }
    };
};