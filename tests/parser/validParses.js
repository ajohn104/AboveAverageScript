var assert = require("assert");
var compile = require("../../debugger.js");

describe('Parser Tests', function(){
    context('Parser Test 1', function() {
        it('should return true if the HelloIndents.avg is valid', function(done){        
            compile("./examples/HelloIndents.avg", function(isValid) {
                assert(isValid);
                done();
            });
        });
    });
    context('Parser Test 2', function() {
        it('should return true if the testCases.avg is valid', function(done){
            compile("./examples/testCases.avg", function(isValid) {
                assert(isValid); 
                done();
            });
        });
    });
    context('Parser Test 3', function() {
        it('should return true if the arrow_sign.avg is valid', function(done){
            compile("./examples/arrow_sign.avg", function(isValid) {
                assert(isValid); 
                done();
            });
        });
    });
    context('Parser Test 4', function() {
        it('should return true if the UnpacksConsumersInlines.avg is valid', function(done){
            compile("./examples/UnpacksConsumersInlines.avg", function(isValid) {
                assert(isValid); 
                done();
            });
        });
    });
    context('Parser Test 5', function() {
        it('should return true if the thoroughValidIndents.avg is valid', function(done){
            compile("./examples/thoroughValidIndents.avg", function(isValid) {
                assert(isValid); 
                done();
            });
        });
    });
    context('Parser Test 6', function() {
        it('should return true if the validDecl.avg is valid', function(done){
            compile("./examples/validDecl.avg", function(isValid) {
                assert(isValid); 
                done();
            });
        });
    });
    context('Parser Test 7', function() {
        it('should return true if the fifa2014group.avg is valid', function(done){
            compile("./examples/fifa2014group.avg", function(isValid) {
                assert(isValid); 
                done();
            });
        });
    });
    context('Parser Test 8', function() {
        it('should return true if the lines.avg is valid', function(done){
            compile("./examples/lines.avg", function(isValid) {
                assert(isValid); 
                done();
            });
        });
    });
    context('Parser Test 9', function() {
        it('should return true if the HelloLesser.avg is valid', function(done){
            compile("./examples/HelloLesser.avg", function(isValid) {
                assert(isValid); 
                done();
            });
        });
    });
    context('Parser Test 10', function() {
        it('should return true if the unittests.avg is valid', function(done){
            compile("./examples/unittests.avg", function(isValid) {
                assert(isValid); 
                done();
            });
        });
    });
    context('Parser Test 11', function() {
        it('should return true if the warmup.avg is valid', function(done){
            compile("./examples/warmup.avg", function(isValid) {
                assert(isValid); 
                done();
            });
        });
    });
    context('Parser Test 12', function() {
        it('should return true if the wordcount.avg is valid', function(done){
            compile("./examples/wordcount.avg", function(isValid) {
                assert(isValid); 
                done();
            });
        });
    });
});