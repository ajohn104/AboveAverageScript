// Property        ::= (Id | BoolLit | StringLit) ':' Exp
module.exports = {
    is: function() {
        var indexBefore = index;
        console.log("Property: checking for Id|BoolLit|StringLit, index: " + index );
        if(!expect(Id) && !expect(BoolLit) && !expect(StringLit)) {
            index = indexBefore;
            console.log("Property: cannot find Id|BoolLit|StringLit, index: " + index );
            return false;
        }
        console.log("Property: found Id|BoolLit|StringLit, index: " + index );

        console.log("Property: checking for ':', index: " + index );
        if(parseTokens[index].lexeme !== ':') {
            index = indexBefore;
            console.log("Property: cannot find ':', index: " + index );
            return false;
        }
        index++;
        console.log("Property: found ':', index: " + index );
        console.log("Property: checking for Exp, index: " + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(!expect(Exp)) {
            index = indexBefore;
            console.log("Property: cannot find Exp, index: " + index );
            return false;
        }
        console.log("Property: found Exp. Completed. index: " + index );
        return true;
    }
};