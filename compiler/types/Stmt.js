/* Stmt         ::= ObjIndentDecl
 *               |  ObjIndentAssign
 *               |  DeclareStmt  
 *               |  AssignStmt
 *               |  ConsumeStmt
 *               |  Exp
 *               |  IfStmt
 *               |  Loop
 *               |  SwitchStmt
 *               |  NativeStmt
 */
module.exports = {
    is: function() {
        return expect(ObjIndentDecl) 
             | expect(ObjIndentAssign) 
             | expect(DeclareStmt) 
             | expect(AssignStmt) 
             | expect(ConsumeStmt) 
             | expect(ObjIndentDecl)
             | expect(Exp)
             | expect(IfStmt)
             | expect(Loop)
             | expect(SwitchStmt)
             | expect(NativeStmt);
    };
};