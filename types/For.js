// For             ::= 'for' ( ('let'? Id '=')? Exp ',')? Exp ',' Exp
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity = new For();
        var initialExp = new InitialCondition();
        if(!at('for')) {
            envir.index = indexBefore;
            return false;
        }

        if(at('let')) {
            initialExp.let = "let";
            if(!at(envir.Id)) {
                envir.index = indexBefore;
                return false;
            }
            initialExp.id = envir.last;
            if(!at('=')) {
                envir.index = indexBefore;
                return false;
            }
            if(!at(envir.Exp)) {
                envir.index = indexBefore;
                return false;
            }
            initialExp.exp = envir.last;
            if(!at(',')) {
                envir.index = indexBefore;
                return false;
            }
            entity.firstexp = initialExp;
        } else if(at(envir.Id)) {
            initialExp.id = envir.last;
            if(!at('=')) {
                envir.index = indexBefore;
                return false;
            }
            if(!at(envir.Exp)) {
                envir.index = indexBefore;
                return false;
            }
            initialExp.exp = envir.last;
            if(!at(',')) {
                envir.index = indexBefore;
                return false;
            }
            entity.firstexp = initialExp;
        } else {
            if(!at(Exp)) {
                envir.index = indexBefore;
                return false;
            }
            initialExp.exp = envir.last;

            if(!at(',')) {
                envir.index = indexBefore;
                return false;
            }
            entity.firstexp = initialExp;
        }

        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }
        entity.exp = envir.last;
        if(!at(',')) {
            envir.index = indexBefore;
            return false;
        }
        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }
        entity.repeatexp = envir.last;
        envir.last = entity;
        return true;
    }
};

var For = function() {
    this.firstexp = null;
    this.exp = null;
    this.repeatexp = null;
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "(for";
        if(this.firstexp !== null) {
            out += this.firstexp.toString();
        }
        out += this.exp.toString();
        out += this.repeatexp.toString();
        out += ")";
        return out;
    };
};

var InitialCondition = function() {
    this.let = "";
    this.id = null;
    this.exp = null;
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents;
        if(this.let !== "") {
            out += "(Declare ->" + this.id + "=" + this.exp.toString() + ")";
        } else if(this.id !== null) {
            out += "(Assign ->" + this.id + "=" + this.exp.toString() + ")";
        } else {
            out += "(" + exp.toString() + ")";
        }
        return out;
    };
};