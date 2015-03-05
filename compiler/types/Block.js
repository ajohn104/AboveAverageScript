// Block           ::= (Newline Stmt)*
module.exports = {
    is: function() {
        var indexBefore = index;
        while(expect(Newline)) {
            if(!expect(Stmt)) {
                index = indexBefore;
                return false;
            }
        }
        return true;
    }
};