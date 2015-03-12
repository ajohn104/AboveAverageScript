/* Stmt         ::= ObjIndentDecl
 *               |  ObjIndentAssign
 *               |  DeclareStmt
 *               |  AssignStmt
 *               |  NativeStmt 
 *               |  SwitchStmt
 *               |  Loop
 *               |  IfStmt
 *               |  ConsumeStmt
 *               |  Exp
 *               
 */
module.exports = {
    is: function() {
        debug("Beginning statement search with token:");
        debug(parseTokens[index]);
        debug("index:" + index + " \n");
        debug("Trying ObjIndentDecl")
        var found = expect(ObjIndentDecl);
        if(!found) {
            debug("ObjIndentDecl failed\nTrying ObjIndentAssign");
            found |= expect(ObjIndentAssign);
        } 
        if(!found) {
            debug("ObjIndentAssign failed\nTrying DeclareStmt");
            found |= expect(DeclareStmt);
        } 
        if(!found) {
            debug("DeclareStmt failed\nTrying AssignStmt");
            found |= expect(AssignStmt);
        } 
        if(!found) {
            debug("AssignStmt failed\nTrying NativeStmt");
            found |= expect(NativeStmt);
        } 
        if(!found) {
            debug("NativeStmt failed\nTrying SwitchStmt");
            found |= expect(SwitchStmt);
        } 
        if(!found) {
            debug("SwitchStmt failed\nTrying Loop");
            found |= expect(Loop);
        } 
        if(!found) {
            debug("Loop failed\nTrying IfStmt");
            found |= expect(IfStmt);
        }
        if(!found) {
            debug("IfStmt failed\nTrying ConsumeStmt");
            found |= expect(ConsumeStmt);
        } 
        if(!found) {
            debug("ConsumeStmt failed\nTrying ReturnStmt");
            found |= expect(ReturnStmt);
        } 
        if(!found) {
            debug("ReturnStmt failed\nTrying Exp");
            found |= expect(Exp);
        }
        if(!found) {
            debug("Exp failed");
        }

        debug("Completed statement search. Status: " + found);
        debug("next token to be searched:");
        debug(parseTokens[index]);
        debug("index:" + index + " \n");
        return found;
    }
};