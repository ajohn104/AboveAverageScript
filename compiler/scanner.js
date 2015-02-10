LineByLineReader = require('line-by-line');
LineScanner = require('line_scanner');
Tokens = require('tokens');

var scan = function(file) {
    reader = new LineByLineReader(file, {encoding: 'utf8'});
    var scanner = new Scanner();

    reader.on('error', function(error) {
        console.log("Error on line " + count + ". Error: " + error);
    });
    reader.on('line', function(line) {
        scanner.nextLine(line);
        
    });
    reader.once('end', function() {
        var tokens = scanner.complete();
        console.log(tokens);
    });
}

var Scanner = function() {
    this.currentLine = null;
    this.lineNumber = 0;
    this.inMultilineComment = false;
    this.tokens = [];
    this.nextLine = function(line) {
        this.lineNumber++;
        var chars = line.split("");
        var currentToken = "";
        var escaped = false;
        var inString = false;
        var openQuote = "";
        var inNumber = false;
        var radixAppeared = false;
        var exponentialAppeared = false;
        var inHex = false;
        var inOther = false;
        for(var i = 0; i < chars.length; i++) {
            if(inString) {
                // Checks for end of string
                var isCloseQuote = chars[i] === openQuote;
                if(!isCloseQuote || escaped) {
                    currentToken+=chars[i];
                    escaped = false;
                    continue;
                } else {
                    currentToken+= chars[i];
                    var token = {kind: "StrLit", lexeme:currentToken};
                    this.tokens.push(token);
                    inString = false;
                    escaped = false;
                    currentToken = "";
                    continue;
                }
            }
            else if(inNumber) {
                // Check to see if number should be hex specific
                if( currentToken.length === 1 && currentToken[0] == "0" && chars[i] == "x") {
                    inHex = true;
                    currentToken+=chars[i];
                    continue;
                } else {
                    // If in hex, the number should end on non hex
                    if(inHex) {
                        // If it is an acceptable hex value, add it.
                        if(chars[i].match(/[0-9a-fA-F]/)) {
                            currentToken+=chars[i];
                            continue;
                        } else if(chars[i].match(/[eE]/)) {
                            // another exp really is an error, but I'm allowing it here
                            if(exponentialAppeared) {
                                var token = {kind: "IntLit", lexeme: currentToken};
                                tokens.push(token);
                                inNumber = false;
                                exponentialAppeared = false;
                                i--;
                                currentToken = "";
                                continue;
                            } else {
                                currentToken+= chars[i];
                                exponentialAppeared = true;
                                continue;
                            }
                        } else {
                            var token = {kind: "IntLit", lexeme: currentToken};
                            tokens.push(token);
                            inNumber = false;
                            exponentialAppeared = false;
                            i--;
                            currentToken = "";
                            continue;
                        }
                    } else {
                        if(chars[i].match(/[0-9]/)) {
                            currentToken+=chars[i];
                            continue;
                        } else if(chars[i].match(/[eE]/)) {
                            // another exp really is an error, but I'm allowing it here
                            if(exponentialAppeared) {
                                var token = {kind: "IntLit", lexeme: currentToken};
                                tokens.push(token);
                                inNumber = false;
                                exponentialAppeared = false;
                                radixAppeared = false;
                                i--;
                                currentToken = "";
                                continue;
                            } else {
                                currentToken+= chars[i];
                                exponentialAppeared = true;
                                continue;
                            }
                        } else if(chars[i].match(/\./)) {
                            // Also an error. Allowing it for now.
                            if(radixAppeared || exponentialAppeared) {
                                var token = {kind: "IntLit", lexeme: currentToken};
                                tokens.push(token);
                                inNumber = false;
                                radixAppeared = false;
                                i--;
                                currentToken = "";
                                continue;
                            } else {
                                currentToken+= chars[i];
                                radixAppeared = true;
                                continue;
                            }
                        } else {
                            var token = {kind: "IntLit", lexeme: currentToken};
                            tokens.push(token);
                            inNumber = false;
                            exponentialAppeared = false;
                            radixAppeared = false;
                            i--;
                            currentToken = "";
                            continue;
                        }
                    }
                }   
            } else if(inOther) {

            } else {    // Starting a new word.
                if(chars[i].match(/[0-9]/)) {
                    inNumber = true;
                    currentToken += chars[i];
                    continue;
                } else if(chars[i].match(/[\'\"]/)) {
                    inString = true;
                    openQuote = chars[i];
                    currentToken += chars[i];
                    continue;
                } else {
                    // The few solo tokens, hardcoded:
                    if(Tokens.AlwaysSolo.indexOf(chars[i]) >= 0) {
                        var token = {kind: "Symbol", lexeme: chars[i]};
                        tokens.push(token);
                        continue;
                    } else {
                        inOther = true;
                        currentToken += chars[i];
                        continue;
                    }
                }
                
            }
            
        }
    }
    this.complete = function() {
        return this.tokens;
    }
};

scan(process.argv[2]);