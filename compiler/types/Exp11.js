// Exp11           ::= Exp12 (AddOp Exp12)*
module.exports = {
    is: function() {
        var indexBefore = index;

        if(!expect(Exp12)) {
            index = indexBefore;
            return false;
        }

        while(expect(AddOp)) {
            if(!expect(Exp12)) {
                index = indexBefore;
                return false;
            }
        }

        return true;
    };
};