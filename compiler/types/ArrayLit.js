// ArrayLit        ::= ('[' ']') | ArrayCont
module.exports = {
    is: function() {
        var indexBefore = index;

        if(parseTokens[index].lexeme === '[') {
            index++;
            if(parseTokens[index].lexeme === ']') {
                index++;
                return true;
            }
            index = indexBefore;
        }

        return expect(ArrayCont);
    }
};