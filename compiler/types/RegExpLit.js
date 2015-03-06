// RegExp          ::= '\/[^\/\\]+(?:\\.[^\/\\]*)*\/[igm]{0,3}'
module.exports = {
    is: function() {
        var indexBefore = index;
        if(parseTokens[index].kind !== 'RegExpLit') {
            index = indexBefore;
            return false;
        }
        index++;
        return true;
    }
};