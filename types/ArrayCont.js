// ArrayCont       ::= '[' (Exp (',' Exp)*) | (Indent Newline Exp (',' Newline? Exp)* Dedent Newline) Newline? ']'
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity = new ArrayCont();
        if(!at('[')) {
            envir.index = indexBefore;
            return false;
        }

        if(at(envir.Exp)) {
            entity.array.push(envir.last);
            while(at(',')) {
                if(!at(envir.Exp)) {
                    envir.index = indexBefore;
                    return false;
                }
                entity.array.push(envir.last);
            }
        } else if(at(envir.Indent)) {
            if(!at(envir.Newline)) {
                envir.index = indexBefore;
                return false;
            }
            
            if(!at(envir.Exp)) {
                envir.index = indexBefore;
                return false;
            }
            entity.array.push(envir.last);
            while(at(',')) {
                at(envir.Newline);
                if(!at(envir.Exp)) {
                    envir.index = indexBefore;
                    return false;
                }
                entity.array.push(envir.last);
            }
            if(!at(envir.Dedent)) {
                envir.index = indexBefore;
                return false;
            }

            if(!at(envir.Newline)) {
                envir.index = indexBefore;
                return false;
            }
        } else {
            envir.index = indexBefore;
            return false;
        }
        at(envir.Newline);
        if(!at(']')) {
            envir.index = indexBefore;
            return false;
        }
        envir.last = entity;
        return true;
    }
};

var ArrayCont = function() {
    this.array = [];
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "[";
        for(var i = 0; i < this.array.length; i++) {
            out += this.array[i].toString(0, indLvlHidden) + ",";
        }
        var removeCount = (this.array.length > 0?-1:0);
        out = out.substring(0, out.length+removeCount) + "]";
        return out;
    };
};