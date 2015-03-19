// ArrayLit        ::= ('[' ']') | ArrayCont
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        if(at('[') && at(']')) return true;
        envir.index = indexBefore;
        return at(envir.ArrayCont);
    }
};