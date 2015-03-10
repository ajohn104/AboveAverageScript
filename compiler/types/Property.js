// Property        ::= (Id | BoolLit | StringLit) ':' Exp
module.exports = {
    is: function() {
        var indexBefore = index;
        debug("Property: checking for Id|BoolLit|StringLit, index: " + index );
        if(!expect(Id) && !expect(BoolLit) && !expect(StringLit)) {
            index = indexBefore;
            debug("Property: cannot find Id|BoolLit|StringLit, index: " + index );
            return false;
        }
        debug("Property: found Id|BoolLit|StringLit, index: " + index );

        debug("Property: checking for ':', index: " + index );
        if(parseTokens[index].lexeme !== ':') {
            index = indexBefore;
            debug("Property: cannot find ':', index: " + index );
            return false;
        }
        index++;
        debug("Property: found ':', index: " + index );
        debug("Property: checking for Exp, index: " + index + ', lexeme: ' + parseTokens[index].lexeme);
        if(!expect(Exp)) {
            index = indexBefore;
            debug("Property: cannot find Exp, index: " + index );
            return false;
        }
        debug("Property: found Exp. Completed. index: " + index );
        return true;
    }
};