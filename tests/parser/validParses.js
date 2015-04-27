var assert = require("assert");
var compile = require("../../debugger.js");

describe('Compiler Tests', function(){
    context('Compiler Test 1', function() {
        it('should return true if the file is valid', function(done){        
            compile("./examples/HelloIndents.avg", function(isValid) {
                assert(isValid);
                done();
            });
        });
    });
    context('Compiler Test 2', function() {
        it('should return true if the file is valid', function(done){
            compile("./examples/testCases.avg", function(isValid) {
                assert(isValid); 
                done();
            });
        });
    });
    context('Compiler Test 3', function() {
        it('should return true if the file is valid', function(done){
            compile("./examples/arrow_sign.avg", function(isValid) {
                assert(isValid); 
                done();
            });
        });
    });
    context('Compiler Test 4', function() {
        it('should return true if the file is valid', function(done){
            compile("./examples/UnpacksConsumersInlines.avg", function(isValid) {
                assert(isValid); 
                done();
            });
        });
    });
    context('Compiler Test 5', function() {
        it('should return true if the file is valid', function(done){
            compile("./examples/thoroughValidIndents.avg", function(isValid) {
                assert(isValid); 
                done();
            });
        });
    });
    context('Compiler Test 6', function() {
        it('should return true if the file is valid', function(done){
            compile("./examples/validDecl.avg", function(isValid) {
                assert(isValid); 
                done();
            });
        });
    });
    
});