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
        console.log("Beginning statement search with token:");
        console.log(parseTokens[index]);
        console.log("index:" + index + " \n");
        console.log("Trying ObjIndentDecl")
        var found = expect(ObjIndentDecl);
        if(!found) {
            console.log("ObjIndentDecl failed\nTrying ObjIndentAssign");
            found |= expect(ObjIndentAssign);
        } 
        if(!found) {
            console.log("ObjIndentAssign failed\nTrying DeclareStmt");
            found |= expect(DeclareStmt);
        } 
        if(!found) {
            console.log("DeclareStmt failed\nTrying AssignStmt");
            found |= expect(AssignStmt);
        } 
        if(!found) {
            console.log("AssignStmt failed\nTrying NativeStmt");
            found |= expect(NativeStmt);
        } 
        if(!found) {
            console.log("NativeStmt failed\nTrying SwitchStmt");
            found |= expect(SwitchStmt);
        } 
        if(!found) {
            console.log("SwitchStmt failed\nTrying Loop");
            found |= expect(Loop);
        } 
        if(!found) {
            console.log("Loop failed\nTrying IfStmt");
            found |= expect(IfStmt);
        }
        if(!found) {
            console.log("IfStmt failed\nTrying ConsumeStmt");
            found |= expect(ConsumeStmt);
        } 
        if(!found) {
            console.log("ConsumeStmt failed\nTrying Exp");
            found |= expect(Exp);
        } 
        if(!found) {
            console.log("Exp failed");
        }

        console.log("Completed statement search. Status: " + found);
        console.log("next token to be searched:");
        console.log(parseTokens[index]);
        console.log("index:" + index + " \n");
        return found;
    }
};