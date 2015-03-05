// BoolLit         ::= 'true' | 'false'
module.exports = {
    is: function() {
        var indexBefore = index;
        if(tokens[index].lexeme === 'true' || tokens[index].lexeme === 'false') {
            index++;
            return true;
        }
        
        return expect(BoolLit)
             | expect(Intlit)
             | expect(StringLit)
             | expect(Func)
             | expect(ArrayCont)
             | expect(ObjectInline)
             | expect(This);
    };
};