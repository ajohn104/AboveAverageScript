// Prop            ::= (Id | BoolLit | StringLit) ':' Exp
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        debug("Prop: checking for Id|BoolLit|StringLit, index: " + envir.index );
        if(!(at(envir.Id) || at(envir.BoolLit) || at(envir.StringLit))) {
            envir.index = indexBefore;
            debug("Prop: cannot find Id|BoolLit|StringLit, index: " + envir.index );
            return false;
        }
        debug("Prop: found Id|BoolLit|StringLit, index: " + envir.index );

        debug("Prop: checking for ':', index: " + envir.index );
        if(!at(':')) {
            envir.index = indexBefore;
            debug("Prop: cannot find ':', index: " + envir.index );
            return false;
        }
        debug("Prop: found ':', index: " + envir.index );
        debug("Prop: checking for Exp, index: " + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            debug("Prop: cannot find Exp, index: " + envir.index );
            return false;
        }
        debug("Prop: found Exp. Completed. index: " + envir.index );
        return true;
    }
};