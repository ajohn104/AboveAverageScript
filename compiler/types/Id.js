// Id              ::= '[_$a-zA-Z][$\w]*(?=[^$\w]|$)'
module.exports = {
    is: function() {
        var indexBefore = index;
        if(parseTokens[index].kind !== 'Id') {
            index = indexBefore;
            return false;
        }
        index++;
        debug("Finalizing id success. index:" + index + ', lexeme: ' + parseTokens[index-1].lexeme);
        return true;
    }
};