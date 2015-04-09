// EOF             ::= '@EOF'
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;
        debug("At of of file");
        if(env.parseTokens[env.index].kind !== 'EndOfFile') {
            env.index = indexBefore;
            return false;
        }
        env.index++;

        return true;
    }
};