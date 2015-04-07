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
    is: function(at, next, envir, debug) {
        debug("Beginning statement search with token:");
        debug(envir.parseTokens[envir.index]);
        debug("index:" + envir.index + "\n");
        debug("Trying DeclareStmt")
        var found = at(envir.DeclareStmt);
        var isExp = false;
        if(!found) {
            debug("DeclareStmt failed\nTrying AssignStmt");
            found |= at(envir.AssignStmt);
        } 
        if(!found) {
            debug("AssignStmt failed\nTrying NativeStmt");
            found |= at(envir.NativeStmt);
        } 
        if(!found) {
            debug("NativeStmt failed\nTrying SwitchStmt");
            found |= at(envir.SwitchStmt);
        } 
        if(!found) {
            debug("SwitchStmt failed\nTrying Loop");
            found |= at(envir.Loop);
        } 
        if(!found) {
            debug("Loop failed\nTrying IfStmt");
            found |= at(envir.IfStmt);
        }
        if(!found) {
            debug("IfStmt failed\nTrying ConsumeStmt");
            found |= at(envir.ConsumeStmt);
        } 
        if(!found) {
            debug("ConsumeStmt failed\nTrying ReturnStmt");
            found |= at(envir.ReturnStmt);
        } 
        if(!found) {
            debug("ReturnStmt failed\nTrying ControlStmt");
            found |= at(envir.ControlStmt);
        } 
        if(!found) {
            debug("ControlStmt failed\nTrying Exp");  
            found |= at(envir.Exp);
            isExp = found;
        }
        // Left off at Exp13. Also, nearly no children were done, either.
        if(!found) {
            debug("Exp failed");  
        }

        debug("Completed statement search. Status: " + found);
        if(found) {
            //debug("Last found: " + envir.last.toString(0, 0)); //Turned off while under development.
        }
        debug("next token to be searched:");
        debug(envir.parseTokens[envir.index]);
        debug("index:" + envir.index + " \n");
        return found;
    }

    // No entity needed, since the entity should really be specific to the type of stmt/exp found.
};