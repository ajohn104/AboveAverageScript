// Exp9            ::= Exp10 (CompareOp Exp10)*
module.exports = {
    is: function() {
        var indexBefore = index;

        if(!expect(Exp10)) {
            index = indexBefore;
            return false;
        }

        while(expect(CompareOp)) {
            if(!expect(Exp10)) {
                index = indexBefore;
                return false;
            }
        }

        return true;
    };
};