// Call            ::= '(' ( Exp (',' Exp)* (',' Indent Newline Exp (Newline ',' Exp)* Dedent)? )? Newline? ')'
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        debug("Starting call test");
        if(parseTokens[envir.index].lexeme !== '(') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;
        debug("Checking for function arguments. envir.index:" + envir.index);
        if(at(envir.Exp)) {
            var indexMid = envir.index;
            if(parseTokens[envir.index].lexeme === ',') {
                envir.index++;
                if(at(envir.Exp)) {
                    indexMid = envir.index;
                    while(parseTokens[envir.index].lexeme === ',') {
                        envir.index++;
                        if(!at(envir.Exp)) {
                            envir.index = indexMid;
                            break;
                        }
                        indexMid = envir.index;
                    }
                }
            }
            if(parseTokens[envir.index].lexeme === ',') {
                envir.index++;
                if(!at(envir.Indent)) {
                    envir.index = indexMid;
                    return false;
                }

                if(!at(envir.Newline)) {
                    envir.index = indexMid;
                    return false;
                }

                if(!at(envir.Exp)) {
                    envir.index = indexMid;
                    return false;
                }

                while(parseTokens[envir.index].kind === "Newline" && parseTokens[envir.index+1].lexeme === ",") {
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


        } else {
            debug("Cannot find any arguments to function. Checking for ')'. envir.index:" + envir.index);
        }

        at(envir.Newline);

        if(parseTokens[envir.index].lexeme !== ')') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;
        debug("Ending successful call on function: " + parseTokens[indexBefore-1].lexeme);
        return true;
    }
};