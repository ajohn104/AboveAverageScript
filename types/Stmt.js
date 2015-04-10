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
        var found = at(env.DeclareStmt);
        var isExp = false;
        if(!found) {
            debug("DeclareStmt failed\nTrying AssignStmt");
            found |= at(env.AssignStmt);
        } 
        if(!found) {
            debug("AssignStmt failed\nTrying NativeStmt");
            found |= at(env.NativeStmt);
        } 
        if(!found) {
            debug("NativeStmt failed\nTrying SwitchStmt");
            found |= at(env.SwitchStmt);
        } 
        if(!found) {
            debug("SwitchStmt failed\nTrying Loop");
            found |= at(env.Loop);
        } 
        if(!found) {
            debug("Loop failed\nTrying IfStmt");
            found |= at(env.IfStmt);
        }
        if(!found) {
            debug("IfStmt failed\nTrying ConsumeStmt");
            found |= at(env.ConsumeStmt);
        } 
        if(!found) {
            debug("ConsumeStmt failed\nTrying ReturnStmt");
            found |= at(env.ReturnStmt);
        } 
        if(!found) {
            debug("ReturnStmt failed\nTrying ControlStmt");
            found |= at(env.ControlStmt);
        } 
        if(!found) {
            debug("ControlStmt failed\nTrying Exp");  
            found |= at(env.Exp);
            isExp = found;
        }
        // Left off at Exp13. Also, nearly no children were done, either.
        if(!found) {
            debug("Exp failed");  
        }

        debug("Completed statement search. Status: " + found);
        debug("next token to be searched:");
        debug(env.parseTokens[env.index]);
        debug("index:" + env.index + " \n");
        return found;
    }
};