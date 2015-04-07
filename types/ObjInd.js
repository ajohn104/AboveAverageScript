// ObjInd          ::= Indent (Newline (Prop|PropInd) )+ Dedent
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity = new ObjectInd();
        if(!at(envir.Indent)) {
            envir.index = indexBefore;
            return false;
        }
        if(!at(envir.Newline)) {
            envir.index = indexBefore;
            return false;
        }
        if(!(at(envir.Prop) || at(envir.PropInd))) {
            entity.props.push(envir.last);
            envir.index = indexBefore;
            return false;
        }
        var indexMid = envir.index;
        while(at(envir.Newline) && (at(envir.Prop) || at(envir.PropInd))) {
            entity.props.push(envir.last);
            indexMid = envir.index;
        }
        envir.index = indexMid;

        if(!at(envir.Dedent)) {
            envir.index = indexBefore;
            return false;
        }
        envir.last = entity;
        return true;
    }
};

var ObjectInd = function() {
    this.props = [];
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "Object ->\n";
        out += envir.indents(indLvlHidden + 1) + "properties: [\n";
        for(var i = 0; i < this.props.length; i++) {
            out += this.props[i].toString(indLvlHidden + 2, indLvlHidden+2) + ",\n";
        }
        var removeCount = (this.props.length > 0?-2:0);
        out = out.substring(0, out.length+removeCount) + "\n" + envir.indents(indLvlHidden + 1)  + "]";
        return out;
    };
};