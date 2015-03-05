// Exp12           ::= Exp13 (MulOp Exp13)*
module.exports = {
    is: function() {
        var indexBefore = index;

        if(!expect(Exp13)) {
            index = indexBefore;
            return false;
        }

        while(expect(MulOp)) {
            if(!expect(Exp13)) {
                index = indexBefore;
                return false;
            }
        }

        return true;
    };
};