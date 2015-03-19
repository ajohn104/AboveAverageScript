// IfStmt          ::= 'if' Exp ':' Indent Block Dedent (Newline 'elif' Exp ':' Indent Block Dedent)* (Newline 'else' Indent Block Dedent)?
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;

        if(!at('if')) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Exp)) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(':')) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Indent)) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Block)) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Dedent)) {
            envir.index = indexBefore;
            return false;
        }
        debug("Completed 'if' block. Moving on to elif. envir.index:" + envir.index);
        while(envir.parseTokens[envir.index].kind === "Newline" && envir.parseTokens[envir.index+1].lexeme === 'elif') {
            envir.index+=2;
            if(!at(envir.Exp)) {
                envir.index = indexBefore;
                return false;
            }

            if(!at(':')) {
                envir.index = indexBefore;
                return false;
            }

            if(!at(envir.Indent)) {
                envir.index = indexBefore;
                return false;
            }

            if(!at(envir.Block)) {
                envir.index = indexBefore;
                return false;
            }

            if(!at(envir.Dedent)) {
                envir.index = indexBefore;
                return false;
            }
        }
        debug("Completed 'elif' blocks. Moving on to else. envir.index:" + envir.index);
        if(envir.parseTokens[envir.index].kind === "Newline" && envir.parseTokens[envir.index+1].lexeme === 'else') {
            envir.index+=2;
            
            if(!at(envir.Indent)) {
                envir.index = indexBefore;
                return false;
            }

            if(!at(envir.Block)) {
                envir.index = indexBefore;
                return false;
            }

            if(!at(envir.Dedent)) {
                envir.index = indexBefore;
                return false;
            }
        }
        debug("Completed 'else' block. Done with IfStmt. envir.index:" + envir.index);
        return true;
    }
};