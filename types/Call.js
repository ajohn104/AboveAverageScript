// Call            ::= '(' ( ExpList (Newline? ',' Indent Newline Exp (Newline ',' Exp)* Dedent)? Newline?)? ')'
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity = new Call();
        debug("Starting call test");
        if(!at('(')) {
            envir.index = indexBefore;
            return false;
        }
        debug("Checking for function arguments. envir.index:" + envir.index);
        if(at(envir.ExpList)) {
            for(var j = 0; j < envir.last.length; j++) {
                entity.args.push(envir.last[j]);
            }
            var indexMid = envir.index;
            at(envir.Newline);
            if(at(',')) {
                if(!at(envir.Indent)) {
                    envir.index = indexBefore;
                    return false;
                }

                if(!at(envir.Newline)) {
                    envir.index = indexBefore;
                    return false;
                }

                if(!at(envir.Exp)) {
                    envir.index = indexBefore;
                    return false;
                }
                entity.args.push(envir.last);

                while(envir.parseTokens[envir.index].kind === "Newline" && envir.parseTokens[envir.index+1].lexeme === ",") {
                    envir.index+=2;
                    if(!at(envir.Exp)) {
                        envir.index = indexBefore;
                        return false;
                    }
                    entity.args.push(envir.last);
                }

                if(!at(envir.Dedent)) {
                    envir.index = indexBefore;
                    return false;
                }
            }

            at(envir.Newline);
        } else {
            debug("Cannot find any arguments to function. Checking for ')'. envir.index:" + envir.index);
        }

        

        if(!at(')')) {
            envir.index = indexBefore;
            return false;
        }
        envir.last = entity;
        debug("Ending successful call on function: " + envir.parseTokens[indexBefore-1].lexeme);
        return true;
    }
};

var Call = function() {
    this.args = [];
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = "Call ->(";
        for(var i = 0; i < this.args.length; i++) {
            out += "(" + this.args[i].toString(0, indLvlHidden) + "),";
        }
        var removeCount = (this.args.length > 0?-1:0);
        out = out.substring(0, out.length+removeCount) + ")";
        return out;
    };
};