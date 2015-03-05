// Exp8            ::= Exp9 (EqualOp Exp9)*
module.exports = {
    is: function() {
        var indexBefore = index;

        if(!expect(Exp9)) {
            index = indexBefore;
            return false;
        }

        while(expect(EqualOp)) {
            if(!expect(Exp9)) {
                index = indexBefore;
                return false;
            }
        }

        return true;
    };
};