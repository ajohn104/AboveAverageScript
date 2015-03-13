// ForIn           ::= 'for' Id (',' Id)? 'in' Exp
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting for-in. envir.index:" + envir.index);
        if(parseTokens[envir.index].lexeme !== 'for') {
            envir.index = indexBefore;
            return false;
        } 
        envir.index++;

        if(!at(envir.Id)) {
            envir.index = indexBefore;
            return false;
        }

        if(parseTokens[envir.index].lexeme === ',') {
            envir.index++;
            if(!at(envir.Id)) {
                envir.index = indexBefore;
                return false;
            }
        }

        if(parseTokens[envir.index].lexeme !== 'in') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;

        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }
        debug("Completed for-in. envir.index:" + envir.index);
        return true;
    }
};