// ObjInd          ::= Indent (Newline (Prop|PropInd) )+ Dedent
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        if(!at(envir.Indent)) {
            envir.index = indexBefore;
            return false;
        }
        if(!at(envir.Newline)) {
            envir.index = indexBefore;
            return false;
        }
        if(!(at(envir.Prop) || at(envir.PropInd))) {
            envir.index = indexBefore;
            return false;
        }
        var indexMid = envir.index;
        while(at(envir.Newline) && (at(envir.Prop) || at(envir.PropInd))) {
            indexMid = envir.index;
        }
        envir.index = indexMid;

        if(!at(envir.Dedent)) {
            envir.index = indexBefore;
            return false;
        }
        return true;
    }
}