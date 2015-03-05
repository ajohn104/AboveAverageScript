// ConsumeStmt     ::= Assignable? '<-' Id ArrayCont
module.exports = {
    is: function() {
        var indexBefore = index;

        expect(Assignable));

        while(tokens[index].lexeme === ',') {
            index++;
            if(!expect(Assignable)) {
                index = indexBefore;
                return false;
            }
        }

        if(tokens[index].lexeme !== '<-')
            index = indexBefore;
            return false;
        }
        index++;

        if(!expect(Id)) {
            index = indexBefore;
            return false;
        }

        if(!expect(ArrayCont)) {
            index = indexBefore;
            return false;
        }

        return true;
};