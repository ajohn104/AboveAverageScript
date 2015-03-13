var assert = require("assert");
var compile = require("../../compiler.js");

describe('Compiler Tests', function(){
    describe('Compiler Test 1', function() {
        it('returns true if the file is valid', function(done){        
            compile("./examples/HelloIndents.avg", function(isValid) {
                assert(isValid);
                done();
            });
        });
    });
    describe('Compiler Test 2', function() {
        it('should return true if the file is valid', function(done){
            compile("./examples/testCases.avg", function(isValid) {
                assert(isValid); 
                done();
            });
        });
    });
    
});