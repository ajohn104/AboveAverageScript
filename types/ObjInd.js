// ObjInd          ::= Indent (Newline (Prop|PropInd) )+ Dedent
module.exports = function(env, at, next, debug) {
    var Indent, Newline, Prop, PropInd, Dedent;
    return {
        loadData: function() {
            Indent = env.Indent,
            Newline = env.Newline,
            Prop = env.Prop,
            PropInd = env.PropInd,
            Dedent = env.Dedent;
        },
        is: function() {
            var indexBefore = env.index;
            var entity = new ObjectInd();
            if(!at(Indent)) {
                env.index = indexBefore;
                return false;
            }
            if(!at(Newline)) {
                env.index = indexBefore;
                return false;
            }
            if(!(at(Prop) || at(PropInd))) {
                env.index = indexBefore;
                return false;
            }
            entity.props.push(env.last);
            var indexMid = env.index;
            while(at(Newline) && (at(Prop) || at(PropInd))) {
                entity.props.push(env.last);
                indexMid = env.index;
            }
            env.index = indexMid;

            if(!at(Dedent)) {
                env.index = indexBefore;
                return false;
            }
            env.last = entity;
            return true;
        }
    };
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
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        write(scope.ind(indents) + '{\n');
        for(var i = 0; i < len(this.props); i++) {
            this.props[i].compile(write, scope, indents+1, indentsHidden+1);
            write('\n');
        }
        write(scope.ind(indents) + '}');
    };
};