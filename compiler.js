var scan = require('./scanner').scan;
var parse = require('./parser').parse;
var generate = require('./generator').generate;

/*   */
var scanError = function(errorToken) {    // This should really be in an error.js file.
    switch(errorToken.kind) {
        case "Unused":
            console.error("Scan Error. Found disallowed reserved word: '" + errorToken.lexeme + "'");
            break;
        case "UnexpectedChars":
            console.error("Scan Error. Found unexpected character(s): '" + errorToken.lexeme 
                + "', line number: " +  errorToken.line + ", column: " + errorToken.index);
            break;
    }
    finalCallBack(false);
};

// Ultimately, this is going to assume the command is 'node #filename #*parameters to run file'
// Always. Its a compile-and-run file only.