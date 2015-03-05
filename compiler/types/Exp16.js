// Exp16           ::= Exp17 ArrayCont*
module.exports = {
    is: function() {
        var indexBefore = index;

        if(!expect(Exp17)) {
            index = indexBefore;
            return false;
        }

        while(expect(ArrayCont));

        return true;
    };
};