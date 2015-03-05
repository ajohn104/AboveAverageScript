// Exp13           ::= PrefixOp? Exp14
module.exports = {
    is: function() {
        var indexBefore = index;

        expect(PrefixOp);

        if(!expect(Exp14)) {
            index = indexBefore;
            return false;
        }

        return true;
    };
};