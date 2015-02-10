LineByLineReader = require('line-by-line');
Tokens = require('./tokens');

/*
 * I'm aware this could be a lot shorter, and a lot of code should be in functions. However
 * I felt it was more important for me to be able to read it line by line, and have it work
 * in the end, then make it shorter. So it will be shorter soon.
 */


var scan = function(file, callback) {
    reader = new LineByLineReader(file, {encoding: 'utf8'});
    var scanner = new LineScanner();
    var tokens = [];
    reader.on('error', function(error) {
        console.log("Error on line " + scanner.currentLine + ". Error: " + error);
    });
    reader.on('line', function(line) {
        scanner.nextLine(line);
        
    });
    reader.once('end', function() {
        tokens = scanner.complete();
        if(typeof callback !== "undefined") {
            callback(tokens);
        }
    });
}

var tokensToString = function(tokens){
    var str = "";
    for(var i = 0; i < tokens.length; i++ ) {
        str += tokens[i]['kind'] + "( '" + tokens[i]['lexeme'] + "' ), ";
    }
    return str;
};

var LineScanner = function() {
    this.currentLine = null;
    this.lineNumber = 0;
    this.inMultilineComment = false;
    this.tokens = [];
    this.nextLine = function(line) {
        this.lineNumber++;
        var chars = line.split("");
        var currentToken = "";
        var escaped = false;
        var inNumber = false;
        var inString = false;
        var openQuote = "";
        var radixAppeared = false;
        var exponentialAppeared = false;
        var inHex = false;
        var isOther = false;
        var isWord = false;
        var isOperator = false;
        for(var i = 0; i < chars.length; i++) {
            if(this.inMultilineComment) {
                if(chars.length > i + 1 && chars[i] == "*" && chars[i+1] === "/") {
                    i++;    // To skip the '/'
                    this.inMultilineComment = false;
                    continue;
                } else {
                    continue;
                }
            }
            if(inString) {
                // Checks for end of string
                var isCloseQuote = chars[i] === openQuote;
                if(!isCloseQuote || escaped) {
                    currentToken+=chars[i];
                    escaped = false;
                    continue;
                } else {
                    currentToken+= chars[i];
                    var token = {kind: "StrLit", lexeme:currentToken, line: this.lineNumber, character:i};
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
                                var token = {kind: "IntLit", lexeme: currentToken, line: this.lineNumber, character:i};
                                this.tokens.push(token);
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
                            var token = {kind: "IntLit", lexeme: currentToken, line: this.lineNumber, character:i};
                            this.tokens.push(token);
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
                                var token = {kind: "IntLit", lexeme: currentToken, line: this.lineNumber, character:i};
                                this.tokens.push(token);
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
                                var token = {kind: "IntLit", lexeme: currentToken, line: this.lineNumber, character:i};
                                this.tokens.push(token);
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
                            var token = {kind: "IntLit", lexeme: currentToken, line: this.lineNumber, character:i};
                            this.tokens.push(token);
                            inNumber = false;
                            exponentialAppeared = false;
                            radixAppeared = false;
                            i--;
                            currentToken = "";
                            continue;
                        }
                    }
                }   
            } else if(isOther) {
                if(isWord) {
                    if(chars[i].match(/[_$a-zA-Z0-9]/)) {
                        currentToken+= chars[i];
                        continue;
                    } else {
                        var type = "";
                        type = (isAVGReserved(currentToken)?"Reserved":type);
                        type = (isECMAReserved(currentToken)?"Unused":type);
                        type = (isWordOperator(currentToken)?"Operator":type);
                        type = (type === ""?"ID":type);
                        var token = {kind: type, lexeme: currentToken, line: this.lineNumber, character:i};
                        this.tokens.push(token);
                        isWord = false;
                        isOther = false;
                        i--;
                        currentToken = "";
                        continue;
                    }
                } else {
                    var newToken = currentToken + chars[i];
                    if(canBeOperator(newToken)) {
                        currentToken+= chars[i];
                        continue;
                    } else {
                        var token = {kind: "Operator", lexeme: currentToken, line: this.lineNumber, character:i};
                        this.tokens.push(token);
                        isOperator = false;
                        isOther = false;
                        i--;
                        currentToken = "";
                        continue;
                    }
                }
            } else {    // Starting a new word.
                if(chars.length > i + 1 && chars[i] == "/") {
                    if(chars[i+1] === "/") {
                        return; // The rest of the line is a comment
                    } else if(chars[i+1] === "*") {
                        this.inMultilineComment = true;
                        i++; // to skip the *
                        continue;
                    }
                }
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
                    // Immediate check for ***native*** to make life easier
                    if(chars[i] === "*" && chars.length > i + "***native***".length) {
                        var word = "";
                        for(var j = i; j < i + "***native***".length; j++) {
                            word+=chars[j];
                        }
                        if(word === "***native***") {
                            var token = {kind: "Reserved", lexeme: "***native***", line: this.lineNumber, character:i};
                            this.tokens.push(token);
                            i+="***native***".length-1; // i will be inc after continue, so the -1 fixes that
                            continue;
                        }
                    }
                    // The few solo tokens, hardcoded:
                    if(Tokens.AlwaysSolo.indexOf(chars[i]) >= 0) {
                        var token = {kind: "ControlSymbol", lexeme: chars[i], line: this.lineNumber, character:i};
                        this.tokens.push(token);
                        continue;
                    } else {
                        isOther = true;
                        currentToken += chars[i];
                        if(chars[i].match(/[_$a-zA-Z]/)) {
                            isWord = true;
                        } else if(canBeOperator(currentToken)) {
                            isOperator = true;  // Except ***native***
                        } else {
                            currentToken = "";
                            isOther = false;
                            // This is a character not allowed by the language
                        }
                        continue;
                    }
                }
                
            }
            
        }
        if(currentToken !== "") {
            if(inString) {
                // Should output error or something. Strings are not multiline
                currentToken = "";
                inString = false;
            } else if(inNumber) {
                var token = {kind: "IntLit", lexeme: currentToken, line: this.lineNumber, character:i};
                this.tokens.push(token);
                inNumber = false;
                exponentialAppeared = false;
                radixAppeared = false;
                currentToken = "";
                return;
            } else if(isOther) {
                if(isWord) {
                    var type = "";
                    type = (isAVGReserved(currentToken)?"Reserved":type);
                    type = (isECMAReserved(currentToken)?"Unused":type);
                    type = (type === ""?"ID":type);
                    var token = {kind: type, lexeme: currentToken, line: this.lineNumber, character:i};
                    this.tokens.push(token);
                    isWord = false;
                    isOther = false;
                    currentToken = "";
                } else {
                    var token = {kind: "Operator", lexeme: currentToken, line: this.lineNumber, character:i};
                    this.tokens.push(token);
                    isOperator = false;
                    isOther = false;
                    currentToken = "";
                }
            }
        }
    }
    this.complete = function() {
        return this.tokens;
    }
    // As it happens, we can be greedy when checking for operators.
    // If an operator is suddenly cut short, it will definitely still
    // refer to a valid operator
    var canBeOperator = function(operatorPart) {
        for(i in Tokens.Operators) {
            if(Tokens.Operators[i].indexOf(operatorPart) === 0) {
                return true;
            }
        }
        return false;
    };

    var isWordOperator = function(word) {
        for(i in Tokens.Operators) {
            if(Tokens.Operators[i] === word) {
                return true;
            }
        }
        return false;
    }

    var isAVGReserved = function(word) {
        for(i in Tokens.Reserved) {
            if(Tokens.Reserved[i] === word) {
                return true;
            }
        }
        return false;
    };

    var isECMAReserved = function(word) {
        for(i in Tokens.Unused) {
            if(Tokens.Unused[i] === word) {
                return true;
            }
        }
        return false;
    };
};
var Scanner = {
    scan: scan,
    tokensToString: tokensToString
}

module.exports = Scanner;
