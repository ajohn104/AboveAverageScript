// Id              ::= '[_$a-zA-Z][$\w]*(?=[^$\w]|$)'
module.exports = {
    is: function() {
        var indexBefore = index;
        if(!tokens[index].kind !== 'Id') {
            index = indexBefore;
            return false;
        }
        index++;
        return true;
    };
};