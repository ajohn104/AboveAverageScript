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
        debug("index:" + envir.index + " \n");
        debug("Trying DeclareStmt")
        var found = at(envir.DeclareStmt);
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
        }
        if(!found) {
            debug("Exp failed");
        }

        debug("Completed statement search. Status: " + found);
        debug("next token to be searched:");
        debug(envir.parseTokens[envir.index]);
        debug("index:" + envir.index + " \n");
        return found;
    }
};