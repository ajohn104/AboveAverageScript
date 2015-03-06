// Exp             ::= Exp1 (ForIn | ForColon)*
module.exports = {
    is: function() {
        console.log("Starting on exp. index:" + index + ', lexeme: ' + parseTokens[index].lexeme);
        var indexBefore = index;
        /*console.log("checking for Exp");
        console.log("checking against: ");
        console.log(parseTokens[index]);*/
        if(!expect(Exp1)) {
            index = indexBefore;
            return false;
        }

        while(expect(ForIn) || expect(ForColon));
        console.log("Finalizing exp success. index:" + index  + ', lexeme: ' + parseTokens[index].lexeme + '\n');
        return true;
    }
};