// Call            ::= '(' ( ExpList (Newline? ',' Indent Newline Exp (Newline ',' Exp)* Dedent)? Newline?)? ')'
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;
        var entity = new Call();
        debug("Starting call test");
        if(!at('(')) {
            env.index = indexBefore;
            return false;
        }
        debug("Checking for function arguments. env.index:" + env.index);
        if(at(env.ExpList)) {
            for(var j = 0; j < env.last.length; j++) {
                entity.args.push(env.last[j]);
            }
            var indexMid = env.index;
            at(env.Newline);
            if(at(',')) {
                if(!at(env.Indent)) {
                    env.index = indexBefore;
                    return false;
                }

                if(!at(env.Newline)) {
                    env.index = indexBefore;
                    return false;
                }

                if(!at(env.Exp)) {
                    env.index = indexBefore;
                    return false;
                }
                entity.args.push(env.last);

                while(env.parseTokens[env.index].kind === "Newline" && env.parseTokens[env.index+1].lexeme === ",") {
                    env.index+=2;
                    if(!at(env.Exp)) {
                        env.index = indexBefore;
                        return false;
                    }
                    entity.args.push(env.last);
                }

                if(!at(env.Dedent)) {
                    env.index = indexBefore;
                    return false;
                }
            }

            at(env.Newline);
        } else {
            debug("Cannot find any arguments to function. Checking for ')'. env.index:" + env.index);
        }

        

        if(!at(')')) {
            env.index = indexBefore;
            return false;
        }
        env.last = entity;
        debug("Ending successful call on function: " + env.parseTokens[indexBefore-1].lexeme);
        return true;
    }
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
};