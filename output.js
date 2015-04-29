require('./language/implattempts/native');

module.exports = {
    scanError: function(errorToken) {
        switch(errorToken.kind) {
            case "Unused":
                error("Scan Error. Found disallowed reserved word: '" + errorToken.lexeme + "'");
                break;
            case "UnexpectedChars":
                error("Scan Error. Found unexpected character(s): '" + errorToken.lexeme 
                    + "', line number: " +  errorToken.line + ", column: " + errorToken.index);
                break;
        }
    },
    parseError: function(stuff) {
        error("Parse Error on token:\n" + JSON.stringify(stuff));
    }
}