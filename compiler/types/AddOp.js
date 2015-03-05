// AddOp           ::= '+' | '-'
module.exports = {
    is: function() {
        var indexBefore = index;
        var ops = ['+', '-'];
        if(ops.indexOf(tokens[index].lexeme) === -1) {
            index = indexBefore;
            return false;
        }
        index++;

        return true;
    };
};