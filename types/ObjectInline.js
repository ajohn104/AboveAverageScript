// ObjectInline    ::= '{' (Prop (',' Prop)*) | (Indent Newline Prop (',' Newline Prop)* Dedent Newline) '}'
module.exports = function(env, at, next, debug) {
    var Prop, Indent, Newline, Dedent;
    return {
        loadData: function() {
            Prop = env.Prop,
            Indent = env.Indent,
            Newline = env.Newline,
            Dedent = env.Dedent;
        },
        is: function() {
            var indexBefore = env.index;
            var entity = new ObjectInline();
            if(!at('{')) {
                env.index = indexBefore;
                return false;
            }

            if(at(Prop)) {
                entity.props.push(env.last);
                while(at(',')) {
                    if(!at(Prop)) {
                        env.index = indexBefore;
                        return false;
                    }
                    entity.props.push(env.last);
                }
            } else if(at(Indent)) {
                if(!at(Newline)) {
                    env.index = indexBefore;
                    return false;
                }
                
                if(!at(Prop)) {
                    env.index = indexBefore;
                    return false;
                }
                entity.props.push(env.last);
                while(at(',')) {
                    if(!at(Newline)) {
                        env.index = indexBefore;
                        return false;
                    }
                    if(!at(Prop)) {
                        env.index = indexBefore;
                        return false;
                    }
                    entity.props.push(env.last);
                }
                if(!at(Dedent)) {
                    env.index = indexBefore;
                    return false;
                }

                if(!at(Newline)) {
                    env.index = indexBefore;
                    return false;
                }
            } else {
                ; // Do nothing
            }
            if(!at('}')) {
                env.index = indexBefore;
                return false;
            }
            env.last = entity;
            return true;
        }
    };
};

var ObjectInline = function() {
    this.props = [];
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "Object ->\n";
        out += env.indents(indLvlHidden +1) + "properties: [\n";
        for(var i = 0; i < this.props.length; i++) {
            out += this.props[i].toString(indLvlHidden + 2, indLvlHidden + 2) + ",\n";
        }
        var removeCount = (this.props.length > 0?-2:-1);
        out = out.substring(0, out.length+removeCount) + (removeCount !== -1?"\n" + env.indents(indLvlHidden +1):"")  + "]";
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        write(scope.ind(indents) + '{\n');
        for(var i = 0; i < len(this.props); i++) {
            this.props[i].compile(write, scope, indents+1, indentsHidden+1);
            write('\n');
        }
        write('}');
    };
};