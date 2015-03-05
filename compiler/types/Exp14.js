// Exp14           ::= Exp15 PostfixOp?
module.exports = {
    is: function() {
        var indexBefore = index;

        if(!expect(Exp15)) {
            index = indexBefore;
            return false;
        }

        expect(PostfixOp);

        return true;
    };
};