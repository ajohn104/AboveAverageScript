// ArrayLit        ::= ('[' ']') | ArrayCont
module.exports = {
    is: function() {
        var indexBefore = index;

        if(tokens[index].lexeme === '[') {
            index++;
            if(tokens[index].lexeme === ']') {
                index++;
                return true;
            }
            index = indexBefore;
        }

        return expect(ArrayCont);
    };
};