// ArrayCont       ::= '[' (Exp (',' Exp)*) | (Indent Newline Exp (',' Newline? Exp)* Dedent Newline) Newline? ']'
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;
        var entity = new ArrayCont();
        if(!at('[')) {
            env.index = indexBefore;
            return false;
        }

        if(at(env.Exp)) {
            entity.array.push(env.last);
            while(at(',')) {
                if(!at(env.Exp)) {
                    env.index = indexBefore;
                    return false;
                }
                entity.array.push(env.last);
            }
        } else if(at(env.Indent)) {
            if(!at(env.Newline)) {
                env.index = indexBefore;
                return false;
            }
            
            if(!at(env.Exp)) {
                env.index = indexBefore;
                return false;
            }
            entity.array.push(env.last);
            while(at(',')) {
                at(env.Newline);
                if(!at(env.Exp)) {
                    env.index = indexBefore;
                    return false;
                }
                entity.array.push(env.last);
            }
            if(!at(env.Dedent)) {
                env.index = indexBefore;
                return false;
            }

            if(!at(env.Newline)) {
                env.index = indexBefore;
                return false;
            }
        } else {
            env.index = indexBefore;
            return false;
        }
        at(env.Newline);
        if(!at(']')) {
            env.index = indexBefore;
            return false;
        }
        env.last = entity;
        return true;
    }
};

var ArrayCont = function() {
    this.array = [];
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "[";
        for(var i = 0; i < this.array.length; i++) {
            out += this.array[i].toString(0, indLvlHidden) + ",";
        }
        var removeCount = (this.array.length > 0?-1:0);
        out = out.substring(0, out.length+removeCount) + "]";
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        var max = len(this.array);
        write('[');
        if(max > 0) {
            this.array[0].compile(write, scope, 0, indentsHidden);
        }
        for(var i = 1; i < max; i++) {
            write(', ');
            this.array[i].compile(write, scope, 0, indentsHidden);
        }
        write(']');
    };
};