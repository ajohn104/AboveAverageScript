// Exp             ::= Exp1 (ForIn | ForColon)*
module.exports = {
    is: function() {
        var indexBefore = index;

        if(!expect(Exp1)) {
            index = indexBefore;
            return false;
        }

        while(expect(ForIn) | expect(ForColon));

        return true;
    };
};