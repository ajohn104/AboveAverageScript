// Block           ::= (Newline Stmt)*
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("Beginning block search. index:" + index + " \n");
        console.log("Current token:");
        console.log(parseTokens[index]);
        console.log("Previous token:");
        console.log(parseTokens[index-1]);
        console.log('\n');
        while(expect(Newline)) {
            if(!expect(Stmt)) {
                console.log("Block search failed.\n");
                index = indexBefore;
                return false;
            }
        }
        console.log("Ending block search. index:" + index + " \n");
        console.log("Current token is now:");
        console.log(parseTokens[index]);
        console.log('\n');
        return true;
    }
};