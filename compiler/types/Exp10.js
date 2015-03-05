// Exp10           ::= Exp11 (ShiftOp Exp11)*
module.exports = {
    is: function() {
        var indexBefore = index;

        if(!expect(Exp11)) {
            index = indexBefore;
            return false;
        }

        while(expect(ShiftOp)) {
            if(!expect(Exp11)) {
                index = indexBefore;
                return false;
            }
        }

        return true;
    };
};