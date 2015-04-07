// ObjectInline    ::= '{' (Prop (',' Prop)*) | (Indent Newline Prop (',' Newline Prop)* Dedent Newline) '}'
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity = new ObjectInline();
        if(!at('{')) {
            envir.index = indexBefore;
            return false;
        }

        if(at(envir.Prop)) {
            entity.props.push(envir.last);
            while(at(',')) {
                if(!at(envir.Prop)) {
                    envir.index = indexBefore;
                    return false;
                }
                entity.props.push(envir.last);
            }
        } else if(at(envir.Indent)) {
            if(!at(envir.Newline)) {
                envir.index = indexBefore;
                return false;
            }
            
            if(!at(envir.Prop)) {
                envir.index = indexBefore;
                return false;
            }
            entity.props.push(envir.last);
            while(at(',')) {
                if(!at(envir.Newline)) {
                    envir.index = indexBefore;
                    return false;
                }
                if(!at(envir.Prop)) {
                    envir.index = indexBefore;
                    return false;
                }
                entity.props.push(envir.last);
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
            ; // Do nothing
        }
        if(!at('}')) {
            envir.index = indexBefore;
            return false;
        }
        envir.last = entity;
        return true;
    }
};

var ObjectInline = function() {
    this.props = [];
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "Object ->\n";
        out += envir.indents(indLvlHidden +1) + "properties: [\n";
        for(var i = 0; i < this.props.length; i++) {
            out += this.props[i].toString(indLvlHidden + 2, indLvlHidden + 2) + ",\n";
        }
        var removeCount = (this.props.length > 0?-2:0);
        out = out.substring(0, out.length+removeCount) + "\n" + envir.indents(indLvlHidden +1) + "]";
        return out;
    };
};