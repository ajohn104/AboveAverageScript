// ArrayCont       ::= '[' (Exp (',' Exp)*) | (Indent Newline Exp (',' Newline? Exp)* Dedent Newline) Newline? ']'
module.exports = function(env, at, next, debug) {
    var Exp, Indent, Newline, Dedent;
    return {
        loadData: function() {
            Exp = env.Exp,
            Indent = env.Indent,
            Newline = env.Newline,
            Dedent = env.Dedent;
        },
        is: function() {
            var indexBefore = env.index;
            var entity = new ArrayCont();
            if(!at('[')) {
                env.index = indexBefore;
                return false;
            }

            if(at(Exp)) {
                entity.array.push(env.last);
                while(at(',')) {
                    if(!at(Exp)) {
                        env.index = indexBefore;
                        return false;
                    }
                    entity.array.push(env.last);
                }
            } else if(at(Indent)) {
                if(!at(Newline)) {
                    env.index = indexBefore;
                    return false;
                }
                
                if(!at(Exp)) {
                    env.index = indexBefore;
                    return false;
                }
                entity.array.push(env.last);
                while(at(',')) {
                    at(Newline);
                    if(!at(env.Exp)) {
                        env.index = indexBefore;
                        return false;
                    }
                    entity.array.push(env.last);
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
                env.index = indexBefore;
                return false;
            }
            at(Newline);
            if(!at(']')) {
                env.index = indexBefore;
                return false;
            }
            env.last = entity;
            return true;
        }
    };
};

var ArrayCont = function() {
    this.array = [];
    this.isSingular = function() {
        return true;    // Because an array, by itself, is a single value.
    };
    this.isSingleProp = function() {
        return this.array.length === 1 && !this.array[0].isExp && this.array[0].isSingular();   // Because a prop list can have many values
    };
    this.isSimpleArray = function() {
        if(this.isSingleProp()) return true;
        for(var i = 0; i < this.array.length; i++) {
            if(!this.array[i].isSingular() || this.array[i].isExp) return false;
        }
        return true;
    }
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
        if(this.isSimpleArray()) {
            write('[');
            if(max > 0) {
                this.array[0].compile(write, scope, 0, indentsHidden);
            }
            for(var i = 1; i < max; i++) {
                write(', ');
                this.array[i].compile(write, scope, 0, indentsHidden);
            }
            write(']');
        } else {
            write('([].concat(');
            this.array[0].compile(write, scope, 0, indentsHidden);
            for(var i = 1; i < max; i++) {
                write(', ');
                this.array[i].compile(write, scope, 0, indentsHidden);
            }
            write('))');
        }
    };
};