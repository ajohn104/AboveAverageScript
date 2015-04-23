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
module.exports = function(env, at, next, debug) {
    var DeclareStmt, AssignStmt, NativeStmt, SwitchStmt, Loop, 
        IfStmt, ConsumeStmt, ReturnStmt, ControlStmt, Exp;
    return {
        loadData: function() {
            DeclareStmt = env.DeclareStmt,
            AssignStmt = env.AssignStmt,
            NativeStmt = env.NativeStmt,
            SwitchStmt = env.SwitchStmt,
            Loop = env.Loop,
            IfStmt = env.IfStmt,
            ConsumeStmt = env.ConsumeStmt,
            ReturnStmt = env.ReturnStmt,
            ControlStmt = env.ControlStmt,
            Exp = env.Exp;
        },
        is: function() {
            debug("Beginning statement search with token:");
            debug(env.parseTokens[env.index]);
            debug("index:" + env.index + "\n");
            debug("Trying DeclareStmt")
            var found = at(DeclareStmt);                        // code generation done until full exp
            var isExp = false;
            /*if(!found) {
                debug("DeclareStmt failed\nTrying AssignStmt");
                found |= at(AssignStmt);                        // code generation done until full exp
            } */
            if(!found) {
                debug("DeclareStmt failed\nTrying NativeStmt");
                found |= at(NativeStmt);                        // code generation done unless file reading is incorrect
            } 
            if(!found) {
                debug("NativeStmt failed\nTrying SwitchStmt");
                found |= at(SwitchStmt);                        // code generation done unless buggy
            } 
            if(!found) {
                debug("SwitchStmt failed\nTrying Loop");
                found |= at(Loop);                              // code generation done unless buggy
            } 
            if(!found) {
                debug("Loop failed\nTrying IfStmt");
                found |= at(IfStmt);                            // code generation done unless buggy
            }
            if(!found) {
                debug("IfStmt failed\nTrying ConsumeStmt for local assignment");
                found |= at(ConsumeStmt);                       // code generation does literally nothing noteworthy until full exp
            }
            if(!found) {
                debug("ConsumeStmt failed\nTrying ReturnStmt");
                found |= at(ReturnStmt);                        // code generation done but relies on exp
            }
            if(!found) {
                debug("ReturnStmt failed\nTrying ControlStmt");
                found |= at(ControlStmt);                        // code generation done
            }
            if(!found) {
                debug("ControlStmt failed\nTrying Exp");  
                found |= at(Exp);                        // basic code generation supported up through all expressions
                if(found) {
                    var initialExp = env.last;
                    var indexMid = env.index;
                    var foundMid = false;
                    debug("Initial Expression found, Trying AssignStmt");  
                    if(at(AssignStmt, initialExp)) {
                        isExp = false;
                        foundMid = true;
                        debug("AssignStmt success for explist");  
                    }
                    if(!foundMid) {
                        debug("Didn't find AssignStmt, trying ConsumeStmt");
                        env.index = indexMid;
                        if(at(ConsumeStmt, initialExp)) {
                            isExp = false;
                            foundMid = true;
                            debug("ConsumeStmt success for explist");  
                        }
                    }
                    if(!foundMid) {
                        debug("AssignStmt and ConsumeStmt failed. Defaulting to Expression");  
                        env.last = initialExp;
                        env.index = indexMid;
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
};