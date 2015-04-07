// Exp17           ::= Exp18 (ArrayCont | Call | '.' Exp17)*
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index; 
        var indentedBefore = envir.inIndented;
        var entity = new Exp17();
        debug("Starting on exp17. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        if(!at(envir.Exp18)) {
            envir.index = indexBefore; 
            envir.inIndented = indentedBefore;
            return false;
        }
        entity.val = envir.last;
        var indexMid = envir.index;
        while(next(envir.ArrayCont) || next(envir.Call) || next('.') || next(envir.Indent) || (envir.inIndented && next(envir.Newline))) {
            if(envir.inIndented && next(envir.Newline)) {
                envir.checkIndent();
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
            } else if(next(envir.Indent)) {
                envir.checkIndent();
                if(!at('.')) {
                    envir.index = indexMid;
                    envir.inIndented = indentedBefore;
                    break;
                }
                if(!at(envir.Exp17)) {
                    envir.index = indexMid;
                    envir.inIndented = indentedBefore;
                    break;
                }
                entity.accessors.push(new DotAccessor(envir.last));
            }
        }
        envir.last = entity;
        debug("Finalizing exp17 success. envir.index:" + envir.index + ', lexeme: ' + envir.parseTokens[envir.index].lexeme);
        return true;
    }
};

var Exp17 = function() {
    this.val = null;
    this.accessors = [];
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = this.val.toString(0, indLvlHidden);
        for(var i = 0; i < this.accessors.length; i++) {
            out += "(" + this.accessors[i].toString(0, indLvlHidden) + ")";
        }
        return out;
    };
};

var DotAccessor = function(val) {
    this.val = val;
    this.toString = function(indentlevel, indLvlHidden) {
        return ".(" + val.toString(indentlevel, indLvlHidden) + ")";
    }
};