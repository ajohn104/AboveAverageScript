// PropInd         ::= (Id | BoolLit | StringLit) ':' (Exp | ObjInd)
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        if(!(at(envir.Id) || at(envir.BoolLit) || at(envir.StringLit))) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(':')) {
            envir.index = indexBefore;
            return false;
        }
        if(!(at(envir.Exp) || at(envir.ObjInd))) {
            envir.index = indexBefore;
            return false;
        }
        return true;
    }
};