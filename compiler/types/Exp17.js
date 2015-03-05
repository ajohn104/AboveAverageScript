// Exp17           ::= Exp18 ('.' Id)*
module.exports = {
    is: function() {
        var indexBefore = index;

        if(!expect(Exp18)) {
            index = indexBefore;
            return false;
        }

        while(tokens[index].lexeme === 'new') {
            index++;
            if(!expect(Id)) {
                index = indexBefore;
                return false;
            }
        }

        return true;
    };
};