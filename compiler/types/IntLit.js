// IntLit          ::= '[+-]?((0x[a-fA-F0-9]+)|(\d+(\.\d+)?([eE][+-]?\d+)?))'
module.exports = {
    is: function() {
        var indexBefore = index;
        if(parseTokens[index].kind !== 'IntLit') {
            index = indexBefore;
            return false;
        }
        index++;
        return true;
    }
};