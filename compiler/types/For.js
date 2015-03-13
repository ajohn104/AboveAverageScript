// For             ::= 'for' ( ('let'? Id '=')? Exp ',')? Exp ',' Exp
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;

        if(parseTokens[envir.index].lexeme !== 'for') {
            envir.index = indexBefore;
            return false;
        } 
        envir.index++;

        if(parseTokens[envir.index].lexeme === 'let') {
            envir.index++;
            if(!at(envir.Id)) {
                envir.index = indexBefore;
                return false;
            }
            if(parseTokens[envir.index].lexeme !== '=') {
                envir.index = indexBefore;
                return false;
            }
            envir.index++;
            if(!at(envir.Exp)) {
                envir.index = indexBefore;
                return false;
            }
            if(parseTokens[envir.index].lexeme !== ',') {
                envir.index = indexBefore;
                return false;
            }
            envir.index++;
        } else if(at(envir.Id)) {
            if(parseTokens[envir.index].lexeme !== '=') {
                envir.index = indexBefore;
                return false;
            }
            envir.index++;
            if(!at(envir.Exp)) {
                envir.index = indexBefore;
                return false;
            }
            if(parseTokens[envir.index].lexeme !== ',') {
                envir.index = indexBefore;
                return false;
            }
            envir.index++;
        } else {
            if(parseTokens[envir.index].lexeme !== ',') {
                envir.index = indexBefore;
                return false;
            }
            envir.index++;
        }

        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }
        if(parseTokens[envir.index].lexeme !== ',') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;
        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }

        return true;
    }
};