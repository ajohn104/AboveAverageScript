// Block           ::= (Newline Stmt)*
module.exports = {
    is: function() {
        var indexBefore = index;
        
        debug("Beginning block search. index:" + index + " \n");
        debug("Current token:");
        debug(parseTokens[index]);
        debug("Previous token:");
        debug(parseTokens[index-1]);
        debug('\n');
        
        var indexMid = index;
        while(expect(Newline)) {
            if(!expect(Stmt)) {
                debug("Block search stopped.\n");
                index = indexMid;
                break;
            }
            indexMid = index;
        }
        
        debug("Ending block search. index:" + index + " \n");
        debug("Current token is now:");
        debug(parseTokens[index]);
        debug('\n');
        
        return true;
    }
};