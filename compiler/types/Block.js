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
        var indexMid = index;
        while(expect(Newline)) {
            if(!expect(Stmt)) {
                console.log("Block search stopped.\n");
                index = indexMid;
                break;
            }
            indexMid = index;
        }
        console.log("Ending block search. index:" + index + " \n");
        console.log("Current token is now:");
        console.log(parseTokens[index]);
        console.log('\n');
        return true;
    }
};