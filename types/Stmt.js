/* Stmt         ::= DeclareStmt
 *               |  AssignStmt
 *               |  NativeStmt 
 *               |  SwitchStmt
 *               |  Loop
 *               |  IfStmt
 *               |  ConsumeStmt
 *               |  ReturnStmt
 *               |  ControlStmt
 *               |  Exp
 *               
 */
module.exports = {
    is: function(at, next, env, debug) {
        debug("Beginning statement search with token:");
        debug(env.parseTokens[env.index]);
        debug("index:" + env.index + "\n");
        debug("Trying DeclareStmt")
        var found = at(env.DeclareStmt);                        // code generation done until full exp
        var isExp = false;
        if(!found) {
            debug("DeclareStmt failed\nTrying AssignStmt");
            found |= at(env.AssignStmt);                        // code generation done until full exp
        } 
        if(!found) {
            debug("AssignStmt failed\nTrying NativeStmt");
            found |= at(env.NativeStmt);                        // code generation done unless file reading is incorrect
        } 
        if(!found) {
            debug("NativeStmt failed\nTrying SwitchStmt");
            found |= at(env.SwitchStmt);                        // code generation done unless buggy
        } 
        if(!found) {
            debug("SwitchStmt failed\nTrying Loop");
            found |= at(env.Loop);                              // code generation done unless buggy
        } 
        if(!found) {
            debug("Loop failed\nTrying IfStmt");
            found |= at(env.IfStmt);                            // code generation done unless buggy
        }
        if(!found) {
            debug("IfStmt failed\nTrying ConsumeStmt for local assignment");
            found |= at(env.ConsumeStmt);                       // code generation does literally nothing noteworthy until full exp
        }
        if(!found) {
            debug("ConsumeStmt failed\nTrying ReturnStmt");
            found |= at(env.ReturnStmt);                        // code generation done but relies on exp
        }
        if(!found) {
            debug("ReturnStmt failed\nTrying ControlStmt");
            found |= at(env.ControlStmt);                        // code generation done
        }
        if(!found) {
            debug("ControlStmt failed\nTrying Exp");  
            found |= at(env.Exp);                        // basic code generation supported up through all expressions
            if(found) {
                var initialExp = env.last;
                debug("Initial Expression found\nTrying AssignStmt and possibly ConsumeStmt");  
                if(at(env.AssignStmt, initialExp)) {
                    isExp = false;
                    debug("AssignStmt success for explist");  
                } else if(at(env.ConsumeStmt, initialExp)) {
                    isExp = false;
                    debug("ConsumeStmt success for explist");  
                } else {
                    debug("AssignStmt and ConsumeStmt failed. Defaulting to Expression");  
                    env.last = initialExp;
                    isExp = true;
                }
            }
        }
        
        if(!found) {
            debug("Initial Expression search failed");  
        }
        env.initialExpList = undefined;


        debug("Completed statement search. Status: " + found);
        debug("next token to be searched:");
        debug(env.parseTokens[env.index]);
        debug("index:" + env.index + " \n");
        return found;
    }
};