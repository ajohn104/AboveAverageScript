// Exp18           ::= Assignable | BoolLit | Intlit | StringLit | '(' Exp ')' | Func | ArrayCont | ObjectInline | This | RegExpLit
module.exports = {
    is: function() {
        console.log("Starting on exp18. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        var indexBefore = index;
        if(parseTokens[index].lexeme === '(') {
            index++;
            if(!expect(Exp)) {
                index = indexBefore;
                return false;
            }
            if(parseTokens[index].lexeme !== ')') {
                index = indexBefore;
                return false;
            }
            index++;
            return true;
        }
        var found = expect(Assignable)
                 || expect(BoolLit)
                 || expect(Intlit)
                 || expect(StringLit)
                 || expect(Func)
                 || expect(ArrayCont)
                 || expect(ObjectInline)
                 || expect(This)
                 || expect(RegExpLit);
        var accessIndex = index;
        if(index === 0) accessIndex = 0;
        console.log("Finalizing exp18 success, found:" + found + ", index:" + index + ', lexeme: ' + parseTokens[accessIndex].lexeme);
        return found;
    }
};