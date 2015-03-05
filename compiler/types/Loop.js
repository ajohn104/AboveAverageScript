// Loop            ::= WhileLoop | ForLoop
module.exports = {
    is: function() {
        var indexBefore = index;
        
        return expect(Assignable) | expect(ForLoop);
};