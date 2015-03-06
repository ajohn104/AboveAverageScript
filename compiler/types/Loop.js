// Loop            ::= WhileLoop | ForLoop
module.exports = {
    is: function() {
        var indexBefore = index;
        
        return expect(WhileLoop) || expect(ForLoop);
    }
};