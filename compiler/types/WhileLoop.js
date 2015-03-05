// WhileLoop       ::= DoWhile | While
module.exports = {
    is: function() {
        var indexBefore = index;

        return expect(DoWhile) | expect(While);
};