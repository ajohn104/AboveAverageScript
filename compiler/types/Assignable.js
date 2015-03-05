// Assignable      ::= Id ArrayCont?
module.exports = {
    is: function() {
        var indexBefore = index;

        if(!expect(Id)) {
            index = indexBefore;
            return false;
        }

        expect(ArrayCont);

        return true;
    };
};