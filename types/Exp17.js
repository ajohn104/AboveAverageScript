// Exp17           ::= Exp18 (ArrayCont | Call | '.' Exp17)*
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index; 
        var indentedBefore = envir.inIndent;
        var entity = new Exp17();
        debug("Starting on exp17. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp18)) {
            envir.index = indexBefore; 
            envir.inIndented = indentedBefore;
            return false;
        }
        entity.val = envir.last;
        var indented = false;
        var indexMid = envir.index;
        while(next(envir.ArrayCont) || next(envir.Call) || next('.') || next(envir.Indent) || (indented && next(envir.Newline))) {
            if(indented && at(envir.Newline)) {
                ; // Just suck it up.
            } else if(at(envir.ArrayCont)) {
                entity.accessors.push(envir.last);
            } else if(at(envir.Call)) {
                entity.accessors.push(envir.last);
            } else if(at('.')) {
                if(!at(envir.Exp17)) {
                    entity.accessors.push(envir.last);
                    envir.index = indexMid;
                    break;
                }
                entity.accessors.push(new DotAccessor(envir.last));
            } else if(at(envir.Indent)) {
                if(indented) {
                    envir.index = indexMid;
                    debug("Serious indent issue in Exp17");
                    break;
                }
                debug("Exp17: found Indent, grabbing Newline");
                indented = true;
                at(envir.Newline);
                if(!at('.')) {
                    envir.index = indexMid;
                    break;
                }
                if(!at(envir.Exp17)) {
                    envir.index = indexMid;
                    break;
                }
                entity.accessors.push(new DotAccessor(envir.last));
            }
        }
        if(indented && !at(envir.Dedent)) {
            envir.index = indexMid;
        }
        indented = false;
        envir.last = entity;
        debug("Finalizing exp17 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};

var Exp17 = function() {
    this.val = null;
    this.accessors = [];
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = this.val;
        for(var i = 0; i < this.accessors.length; i++) {
            out += "(" + this.accessors[i].toString() + ")";
        }
        return out;
    };
};

var DotAccessor = function(val) {
    this.val = val;
    this.toString = function(indentlevel) {
        return ".(" + val.toString(indentlevel) + ")";
    }
};