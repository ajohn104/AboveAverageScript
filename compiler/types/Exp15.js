// Exp15           ::= 'new'? Exp16 Call*
module.exports = {
    is: function() {
        var indexBefore = index;

        if(tokens[index].lexeme === 'new') {
            index++;
        }

        if(!expect(Exp16)) {
            index = indexBefore;
            return false;
        }

        while(expect(Call));

        return true;
    };
};