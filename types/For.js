// For             ::= 'for' ( ('let'? Id '=')? Exp ',')? Exp ',' Exp
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;

        if(!at('for')) {
            envir.index = indexBefore;
            return false;
        }

        if(at('let')) {
            if(!at(envir.Id)) {
                envir.index = indexBefore;
                return false;
            }
            if(!at('=')) {
                envir.index = indexBefore;
                return false;
            }
            if(!at(envir.Exp)) {
                envir.index = indexBefore;
                return false;
            }
            if(!at(',')) {
                envir.index = indexBefore;
                return false;
            }
        } else if(at(envir.Id)) {
            if(!at('=')) {
                envir.index = indexBefore;
                return false;
            }
            if(!at(envir.Exp)) {
                envir.index = indexBefore;
                return false;
            }
            if(!at(',')) {
                envir.index = indexBefore;
                return false;
            }
        } else {
            if(!at(',')) {
                envir.index = indexBefore;
                return false;
            }
        }

        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }
        if(!at(',')) {
            envir.index = indexBefore;
            return false;
        }
        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }

        return true;
    }
};