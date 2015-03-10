// Exp18           ::= Id | BoolLit | IntLit | StringLit | '(' Exp Newline? ')' | Func | ArrayLit | ObjectInline | This | RegExpLit
module.exports = {
    is: function() {
        console.log("Starting on exp18. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        var indexBefore = index;
        var isParenthesizedExpr = false;
        if(parseTokens[index].lexeme === '(') {
            index++;
            if(!expect(Exp)) {
                index = indexBefore;
                isParenthesizedExpr = false;
            }
            console.log("Found exp within possible ParenthesizedExpr. Looking for ')'. index:" + index);

            console.log("Checking for newline. index:" + index);
            if(expect(Newline)) {
                console.log("Found newline. index:" + index);
            } // I think this is it.

            if(parseTokens[index].lexeme !== ')') {
                index = indexBefore;
                isParenthesizedExpr = false;
            }
            console.log("Found ')'. Completed ParenthesizedExpr. index:" + index);
            index++;
            isParenthesizedExpr = true;
        }
        var found = isParenthesizedExpr
                 || expect(Id)
                 || expect(BoolLit)
                 || expect(IntLit)
                 || expect(StringLit)
                 || expect(Func)
                 || expect(ArrayLit)
                 || expect(ObjectInline)
                 || expect(This)
                 || expect(RegExpLit);
        var accessIndex = index;
        if(index === 0) accessIndex = 0;
        console.log("Finalizing exp18, found:" + found + ", index:" + index + ', lexeme: ' + parseTokens[accessIndex].lexeme);
        return found;
    }
};