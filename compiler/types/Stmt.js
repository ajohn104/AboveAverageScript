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
        var found = expect(ObjIndentDecl) 
             || expect(ObjIndentAssign) 
             || expect(DeclareStmt) 
             || expect(AssignStmt)
             || expect(NativeStmt)
             || expect(SwitchStmt)
             || expect(Loop)
             || expect(IfStmt)
             || expect(ConsumeStmt)
             || expect(Exp);

        console.log("Completed statement search. Status: " + found);
        console.log("next token to be searched:");
        console.log(parseTokens[index]);
        console.log("index:" + index + " \n");
        return found;
    }
};