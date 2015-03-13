// Exp17           ::= Exp18
// removed: ('.' Exp16 Call?)*
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting on exp17. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        if(!at(envir.Exp18)) {
            envir.index = indexBefore;
            return false;
        }

        /*while(parseTokens[envir.index].lexeme === '.') {
            envir.index++;
            if(!at(Exp16)) {
                envir.index = indexBefore;
                return false;
            }

            at(Call);
        }*/
        debug("Finalizing exp17 success. envir.index:" + envir.index + ', lexeme: ' + parseTokens[envir.index].lexeme);
        return true;
    }
};