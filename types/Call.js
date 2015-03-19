// Call            ::= '(' ( Exp (',' Exp)* (',' Indent Newline Exp (Newline ',' Exp)* Dedent)? Newline?)? ')'
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting call test");
        if(!at('(')) {
            envir.index = indexBefore;
            return false;
        }
        debug("Checking for function arguments. envir.index:" + envir.index);
        if(at(envir.Exp)) {
            var indexMid = envir.index;
            if(at(',')) {
                if(at(envir.Exp)) {
                    indexMid = envir.index;
                    while(at(',')) {
                        if(!at(envir.Exp)) {
                            envir.index = indexMid;
                            break;
                        }
                        indexMid = envir.index;
                    }
                } else {
                    envir.index = indexMid;
                }
            }
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

                while(envir.parseTokens[envir.index].kind === "Newline" && envir.parseTokens[envir.index+1].lexeme === ",") {
                    envir.index+=2;
                    if(!at(envir.Exp)) {
                        envir.index = indexBefore;
                        return false;
                    }
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
        debug("Ending successful call on function: " + envir.parseTokens[indexBefore-1].lexeme);
        return true;
    }
};