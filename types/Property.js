// Property        ::= (Id | BoolLit | StringLit) ':' Exp
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        debug("Property: checking for Id|BoolLit|StringLit, index: " + envir.index );
        if(!(at(envir.Id) || at(envir.BoolLit) || at(envir.StringLit))) {
            envir.index = indexBefore;
            debug("Property: cannot find Id|BoolLit|StringLit, index: " + envir.index );
            return false;
        }
        debug("Property: found Id|BoolLit|StringLit, index: " + envir.index );

        debug("Property: checking for ':', index: " + envir.index );
        if(!at(':')) {
            envir.index = indexBefore;
            debug("Property: cannot find ':', index: " + envir.index );
            return false;
        }
        debug("Property: found ':', index: " + envir.index );
        debug("Property: checking for Exp, index: " + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            debug("Property: cannot find Exp, index: " + envir.index );
            return false;
        }
        debug("Property: found Exp. Completed. index: " + envir.index );
        return true;
    }
};