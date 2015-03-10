// ConsumeStmt     ::= (Exp (',' Exp)*)? '<-' Id (('.' Id)* ArrayCont+ Call?)+
module.exports = {
    is: function() {
        var indexBefore = index;

        expect(Exp);

        while(parseTokens[index].lexeme === ',') {
            index++;
            if(!expect(Exp)) {
                index = indexBefore;
                return false;
            }
        }
        console.log("ConsumeStmt: checking for '<-'. index:" + index + ", lexeme:" + parseTokens[index].lexeme);
        if(parseTokens[index].lexeme !== '<-') {
            index = indexBefore;
            return false;
        }
        index++;
        console.log("ConsumeStmt: found '<-'. checking for Id. index:" + index + ", lexeme:" + parseTokens[index].lexeme);
        if(!expect(Id)) {
            index = indexBefore;
            return false;
        }
        
        if(parseTokens[index].lexeme === '.' || expect(ArrayCont)) {
            if(parseTokens[index].lexeme === '.') {
                while(parseTokens[index].lexeme === '.') {
                    index++;
                    if(!expect(Id)) {
                        index = indexBefore;
                        return false;
                    }
                    
                }
                if(!expect(ArrayCont)) {
                    index = indexBefore;
                    return false;
                }
                while(expect(ArrayCont));
                expect(Call);
            }
        } else {
            index = indexBefore;
            return false;
        }
        while(parseTokens[index].lexeme === '.' || expect(ArrayCont)) {
            if(parseTokens[index].lexeme === '.') {
                while(parseTokens[index].lexeme === '.') {
                    index++;
                    if(!expect(Exp16)) {
                        index = indexBefore;
                        return false;
                    }
                    
                }
                if(!expect(ArrayCont)) {
                    index = indexBefore;
                    return false;
                }
                while(expect(ArrayCont));
                expect(Call);
            }
        }

        /*console.log("ConsumeStmt: checking for final ArrayCont. index:" + index + ", lexeme:" + parseTokens[index].lexeme);
        if(!expect(ArrayCont)) {
            index = indexBefore;
            return false;
        }*/
        console.log("ConsumeStmt: found ArrayCont. index:" + index + ", lexeme:" + parseTokens[index].lexeme);
        return true;
    }
};