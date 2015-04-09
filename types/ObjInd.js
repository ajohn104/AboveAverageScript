// ObjInd          ::= Indent (Newline (Prop|PropInd) )+ Dedent
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;
        var entity = new ObjectInd();
        if(!at(env.Indent)) {
            env.index = indexBefore;
            return false;
        }
        if(!at(env.Newline)) {
            env.index = indexBefore;
            return false;
        }
        if(!(at(env.Prop) || at(env.PropInd))) {
            entity.props.push(env.last);
            env.index = indexBefore;
            return false;
        }
        var indexMid = env.index;
        while(at(env.Newline) && (at(env.Prop) || at(env.PropInd))) {
            entity.props.push(env.last);
            indexMid = env.index;
        }
        env.index = indexMid;

        if(!at(env.Dedent)) {
            env.index = indexBefore;
            return false;
        }
        env.last = entity;
        return true;
    }
};

var ObjectInd = function() {
    this.props = [];
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "Object ->\n";
        out += env.indents(indLvlHidden + 1) + "properties: [\n";
        for(var i = 0; i < this.props.length; i++) {
            out += this.props[i].toString(indLvlHidden + 2, indLvlHidden+2) + ",\n";
        }
        var removeCount = (this.props.length > 0?-2:0);
        out = out.substring(0, out.length+removeCount) + "\n" + env.indents(indLvlHidden + 1)  + "]";
        return out;
    };
};