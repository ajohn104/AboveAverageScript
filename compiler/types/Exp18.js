// Exp18           ::= BoolLit | Intlit | StringLit | '(' Exp ')' | Func | ArrayCont | ObjectInline | This
module.exports = {
    is: function() {
        var indexBefore = index;
        if(tokens[index].lexeme === '(') {
            index++;
            if(!expect(Exp)) {
                index = indexBefore;
                return false;
            }
            if(tokens[index].lexeme !== ')') {
                index = indexBefore;
                return false;
            }
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