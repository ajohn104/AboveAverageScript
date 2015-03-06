// EOF             ::= '@EOF'
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("At of of file");
        if(parseTokens[index].kind !== 'EndOfFile') {
            index = indexBefore;
            return false;
        }
        index++;

        return true;
    }
};