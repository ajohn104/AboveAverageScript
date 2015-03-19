// ForIn           ::= 'for' Id (',' Id)? 'in' Exp
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting for-in. envir.index:" + envir.index);
        if(!at('for')) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Id)) {
            envir.index = indexBefore;
            return false;
        }

        if(at(',')) {
            if(!at(envir.Id)) {
                envir.index = indexBefore;
                return false;
            }
        }

        if(!at('in')) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }
        debug("Completed for-in. envir.index:" + envir.index);
        return true;
    }
};