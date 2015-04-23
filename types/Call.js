// Call            ::= '(' ( ExpList (Newline? ',' Indent Newline Exp (Newline ',' Exp)* Dedent)? Newline?)? ')'
module.exports = function(env, at, next, debug) {
    var ExpList, Newline, Indent, Exp, Dedent;
    return {
        loadData: function() {
            ExpList = env.ExpList,
            Exp = env.Exp,
            Indent = env.Indent,
            Newline = env.Newline,
            Dedent = env.Dedent;
        },
        is: function() {
            var indexBefore = env.index;
            var entity = new Call();
            debug("Starting call test, index: " + env.index);
            if(!at('(')) {
                env.index = indexBefore;
                return false;
            }
            debug("Checking for function arguments. env.index:" + env.index);
            if(at(ExpList)) {
                entity.args = env.last;
                var indexMid = env.index;
                at(Newline);
                if(at(',')) {
                    if(!at(Indent)) {
                        env.index = indexBefore;
                        return false;
                    }

                    if(!at(Newline)) {
                        env.index = indexBefore;
                        return false;
                    }

                    if(!at(Exp)) {
                        env.index = indexBefore;
                        return false;
                    }
                    entity.args.push(env.last);

                    while(env.parseTokens[env.index].kind === "Newline" && env.parseTokens[env.index+1].lexeme === ",") {
                        env.index+=2;
                        if(!at(Exp)) {
                            env.index = indexBefore;
                            return false;
                        }
                        entity.args.push(env.last);
                    }

                    if(!at(Dedent)) {
                        env.index = indexBefore;
                        return false;
                    }
                }

                at(Newline);
            } else {
                debug("Cannot find any arguments to function. Checking for ')'. env.index:" + env.index);
            }

            

            if(!at(')')) {
                env.index = indexBefore;
                return false;
            }
            env.last = entity;
            debug("Ending successful call on function: " + env.parseTokens[indexBefore-1].lexeme + ", index: " + env.index);
            return true;
        }
    };
};

var Call = function() {
    this.args = [];
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = "Call -> arguments: [";
        for(var i = 0; i < this.args.length; i++) {
            out += this.args[i].toString(0, indLvlHidden+1) + ",";
        }
        var removeCount = (this.args.length > 0?-1:0);
        out = out.substring(0, out.length+removeCount) + "]";
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        var max = len(this.args);
        write('(');
        if(max > 0) {
            this.args[0].compile(write, scope, 0, indentsHidden);
        }
        for(var i = 1; i < max; i++) {
            write(', ');
            this.args[i].compile(write, scope, 0, indentsHidden);
        }
        write(')');
    };
};