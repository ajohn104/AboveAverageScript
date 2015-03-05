// StringLit       ::= '\"[^\"\\]*(?:\\.[^\"\\]*)*\"|\'[^\'\\]*(?:\\.[^\'\\]*)*\''
module.exports = {
    is: function() {
        var indexBefore = index;
        if(!tokens[index].kind !== 'StrLit') {
            index = indexBefore;
            return false;
        }
        index++;
        return true;
    };
};