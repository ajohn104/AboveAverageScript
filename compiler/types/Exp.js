// Exp             ::= Exp1 (ForIn | ForColon)*
module.exports = {
    is: function() {
        debug("Starting on exp. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        var indexBefore = index;
        /*debug("checking for Exp");
        debug("checking against: ");
        debug(parseTokens[index]);*/
        if(!expect(Exp1)) {
            index = indexBefore;
            return false;
        }

        while(expect(ForIn) || expect(ForColon));
        debug("Finalizing exp success. index:" + index  + ', lexeme: ' + parseTokens[index].lexeme + '\n');
        return true;
    }
};