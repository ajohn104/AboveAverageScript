LineByLineReader = require('line-by-line');
Tokens = require('./tokens');

var scan = function(file, callback, error) {
    reader = new LineByLineReader(file, {encoding: 'utf8'});
    var scanner = new LineScanner();
    var tokens = [];
    reader.on('error', function(error) {
        console.log("Error on line " + scanner.currentLine + ". Error: " + error);
    });
    reader.on('line', function(line) {
        reader.pause();
        var allValid = scanner.nextLine(line);
        if(!allValid) {
            error(scanner.errorToken);
        } else {
            reader.resume();
        }
    });
    reader.once('end', function() {
        tokens = scanner.complete();
        if(typeof callback !== "undefined") {
            callback(tokens);
        }
    });
};

var parseTokensToStringFull = function(tokens){
    var str = "";
    for(var i = 0; i < tokens.length; i++ ) {
        str += tokens[i]['kind'] + "( '" + tokens[i]['lexeme'] + "' ), ";
    }
    return str;
};

var parseTokensToStringPretty = function(tokens) {
    var str = "";
    for(var i = 0; i < tokens.length; i++ ) {
        if(tokens[i]['kind'] === 'Newline') {
            str += "\n\'\\n\'";
        } else if(tokens[i]['kind'] === "Indent") {
            str += " \'\\i\'";
        } else {
            str += " \'"+ tokens[i]['lexeme'] + "\'";
        }
    }
    return str;
};

var parseTokensToStringBest = function(tokens) {
    var str = "";
    for(var i = 0; i < tokens.length; i++ ) {
        var abbr = null;
        var token = tokens[i];
        for(var j = 0; j < Tokens.kinds.length; j++) {
            var pair = Tokens.kinds[j];
            if(pair.kind === token.kind) {
                abbr = pair.abbr;
                break;
            }
        }
        if(abbr === null) {
            var lexeme = token['lexeme'];
            lexeme = (lexeme === Tokens['Indent'][0])?'\\t':lexeme;
            str += (lexeme === "\\n")?'\n':'';
            var spacing = (lexeme === "\\n")?'':' ';
            str += spacing + "\'" + lexeme + "\'";
        } else {
            str += " " + abbr + "(\'" + tokens[i]['lexeme'] + "\')";
        }
    }
    return str;
};

var parseTokensToStringSpacially = function(tokens) {
    var str = "";
    var indent = "    ";
    var charCount = 0;
    for(var i = 0; i < tokens.length; i++ ) {
        if(tokens[i]['kind'] === 'Newline') {
            str += "\n";
            charCount = 0;
        }
        var newStr = tokens[i]['kind'] + "('" + tokens[i]['lexeme'] + "'), ";
        if(newStr.length + charCount > 80) {
            charCount = indent.length;
            str += "\n" + indent;
        }
        str += tokens[i]['kind'] + "('" + tokens[i]['lexeme'] + "'), ";
        charCount += newStr.length;
    }
    return str;
};

var LineScanner = function() {
    this.currentLine = null;
    this.lineNumber = 0;
    this.inMultilineComment = false;
    this.tokens = [];
    this.indentsInPreviousLine = 0;
    this.errorToken = null;
    this.nextLine = function(line) {
        var contentHasAppeared = false;
        this.lineNumber++;
        var charAt = 1;
        var indentsOnThisLine = [];
        while(line.length > 0) {
            if(!this.inMultilineComment) {
                var token = this.getNextToken(line, contentHasAppeared);
                if(token === null) {
                    break;
                }
                if(this.isSinglelineComment(token)) {
                    line = "";
                    break;
                } 
                if(this.isMultilineComment(token)) {
                    this.inMultilineComment = true;
                    line = line.substring(2);
                    charAt += 2;
                    continue;
                }
                if(this.isIndent(token) && !contentHasAppeared) {
                    charAt+= token.index;
                    token.column = charAt;
                    var tokenIndex = token.index;
                    delete token.index;
                    indentsOnThisLine.push(token);
                    line = line.substring(token.lexeme.length + tokenIndex);
                    charAt += token.lexeme.length;
                    continue;
                }
                var hasAppearedBefore = contentHasAppeared;
                contentHasAppeared = (!this.isIndent(token))?true:contentHasAppeared;
                if(hasAppearedBefore !== contentHasAppeared) {
                    for(var k = indentsOnThisLine.length; k < this.indentsInPreviousLine; k++) {
                        var prev = this.tokens.pop();
                        this.tokens.push({kind:"Dedent", lexeme:"\\d", line: this.lineNumber});
                        this.tokens.push(prev);
                    }
                    for(var l = this.indentsInPreviousLine; l < indentsOnThisLine.length; l++) {
                        var prev = this.tokens.pop();
                        this.tokens.push({kind:"Indent", lexeme:"\\i", line: this.lineNumber});
                        this.tokens.push(prev);
                    }
                    this.indentsInPreviousLine = indentsOnThisLine.length;
                }
                if(token.kind === "UnexpectedChars" || token.kind === "Unused") {
                    this.errorToken = token;
                    return false;
                }
                token.line = this.lineNumber;
                charAt += token.index;
                token.column = charAt;
                var tokenIndex = token.index;
                delete token.index;
                this.tokens.push(token);
                line = line.substring(token.lexeme.length + tokenIndex);
                charAt += token.lexeme.length;
                continue;
            } else {
                var characterNumber = line.indexOf(Tokens.Comment[2]);
                if(characterNumber >= 0) {
                    this.inMultilineComment = false;
                    line = line.substring(characterNumber+2);
                    charAt += characterNumber+2;
                } else {
                    line = "";
                    break;
                }
            }
        }
        var lastToken = this.getLastToken();
        if(!this.inMultilineComment && typeof lastToken !== "undefined" && !this.isNewline(lastToken)) {
            var token = {kind: "Newline", lexeme:"\\n", line: this.lineNumber+1};
            this.tokens.push(token);
        }
        return true;
    };
    this.getLastToken = function() {
        return this.tokens[this.tokens.length-1];
    };
    this.isNewline = function(token) {
        return token.lexeme === "\\n";
    };
    this.isSinglelineComment = function(token) {
        return token.lexeme === Tokens.Comment[0];
    };
    this.isMultilineComment = function(token) {
        return token.lexeme === Tokens.Comment[1];
    };
    this.isIndent = function(token) {
        return token.lexeme === Tokens.Indent[0];
    };
    var getBestMatch = function(line, array, wordBreak) {
        wordBreak = (typeof wordBreak === "undefined")?false:wordBreak;
        var index = -1;
        var arrayIndex = -1;
        for(var i = 0; i < array.length; i++) {
            var token = array[i];
            var tokenIndex;
            if(wordBreak) {
                tokenIndex = line.search(new RegExp(token + "\\b"));
            } else {        // I know I could have used the ?: here, but I wanted to ensure laziness.
                tokenIndex = line.indexOf(token);
            }
            if(index === -1 || (tokenIndex >= 0 && tokenIndex < index)) {
                index = tokenIndex;
                arrayIndex = i;
            }
        }
        return {index: index, arrayIndex:arrayIndex};
    };
    var getMatch = function(line, kind, wordBreak) {
        var matchIndexes = getBestMatch(line, Tokens[kind], wordBreak);
        var matchIndex = matchIndexes['index'];
        if(matchIndex === -1) return null;
        var size = Tokens[kind][matchIndexes['arrayIndex']].length;
        var match = line.substring(matchIndex, matchIndex + size);
        var token = {kind: kind, lexeme: match, index: matchIndex};
        return token;
    };
    var getMatchReg = function(line, kind, regexStr) {
        var start = null;
        var matches = line.match(new RegExp(regexStr));
        if(matches === null) return null;
        var match = matches[0], 
            matchIndex = matches['index'];
        var token = {kind: kind, lexeme: match, index: matchIndex};
        return token;
    };
    var getOperatorMatch = function(line) {
        var matchIndex, size;
        matchIndex = getBestMatch(line, Tokens.OneCharacterOperators)['index'];
        if(matchIndex >= 0) size = 1;
        [Tokens.TwoCharacterOperators, Tokens.ThreeCharacterOperators, Tokens.FourCharacterOperators]
            .forEach(function(array, newSize) {
                newSize += 2;
                var newMatchIndex = getBestMatch(line, array)['index'];
                if(newMatchIndex !== -1 && newMatchIndex <= matchIndex) {
                    matchIndex = newMatchIndex;
                    size = newSize;
                }
            });
        var newMatchIndexes = getBestMatch(line, Tokens.WordOperators, true);
        if(newMatchIndexes['index'] !== -1 && newMatchIndexes['index'] <= matchIndex) {
            matchIndex = newMatchIndexes['index'];
            size = Tokens.WordOperators[newMatchIndexes['arrayIndex']].length;
        }
        
        if(matchIndex === -1) return null;
        var match = line.substring(matchIndex, matchIndex + size);
        var token = {kind: "Operator", lexeme: match, index: matchIndex};
        return token;
    };
    var getSeparatorMatch = function(line) {
        return getMatch(line, "Separator");
    };
    var getIdMatch = function(line) {
        return getMatchReg(line, "Id", "[_$a-zA-Z][$\\w]*(?=[^$\\w]|$)");
    };
    var getIntMatch = function(line) {
        return getMatchReg(line, "IntLit", "[+-]?((0x[a-fA-F0-9]+)|(\\d+(\\.\\d+)?([eE][+-]?\\d+)?))");
    };
    // newest string literal regex courtesy of arcain from StackOverflow
    var getStrMatch = function(line) {      
        return getMatchReg(line, "StrLit", "\\\"[^\\\"\\\\]*(?:\\\\.[^\\\"\\\\]*)*\\\"|\\\'[^\\\'\\\\]*(?:\\\\.[^\\\'\\\\]*)*\\\'");
    };
    // Slightly adapted from the string regex...
    var getRegExpMatch = function(line) {
        return getMatchReg(line, "RegExpLit", "\\/[^\\/\\\\]+(?:\\\\.[^\\/\\\\]*)*\\/[igm]{0,3}");
    };
    var getBoolMatch = function(line) {
        return getMatch(line, "BoolLit", true);
    };
    var getCommentMatch = function(line) {
        return getMatch(line, "Comment");
    };
    var getIndentMatch = function(line) {
        return getMatch(line, "Indent");
    };
    var getNativeMatch = function(line) {
        return getMatch(line, "Native");
    };
    var getReservedMatch = function(line) {
        return getMatch(line, "Reserved", true);
    };
    var getUnusedMatch = function(line) {
        return getMatch(line, "Unused", true);
    };
    var tokenFunctions = [
        getReservedMatch, getUnusedMatch, getBoolMatch, getCommentMatch,
        /*getRegExpMatch,*/ getNativeMatch, getOperatorMatch, getSeparatorMatch,
        getStrMatch, getIntMatch, getIdMatch
    ];
    var regexpTokens = ['=', '(', ':', 'ret', 'and', 'or', 'not'];
    this.getNextToken = function(line, contentHasAppeared) {
        var token = null;
        token = getIndentMatch(line);
        if(!contentHasAppeared && token !== null && token.index === 0) {
            return token;
        }
        
        var tokenOptions = [];
        for(var i = 0; i < tokenFunctions.length; i++) {
            var token = tokenFunctions[i](line);
            var priority = i;
            if(priority > 3) priority++;
            if(token !== null) {
                tokenOptions.push({token:token, priority: priority});
            }
        }
        var lastToken = this.getLastToken();
        if( (typeof lastToken !== "undefined") && regexpTokens.indexOf(lastToken.lexeme) >= 0) {
            var token = getRegExpMatch(line);
            if(token !== null) {
                tokenOptions.push({token:token, priority: 4});
            }
        }
        var option = null;
        for(var j = 0; j < tokenOptions.length; j++) {
            var newToken = tokenOptions[j];
            if(option === null) {
                option = newToken;
                continue;
            }
            var betterIndex = newToken.token.index < option.token.index;
            var betterPriority = (newToken.token.index === option.token.index) && (newToken.priority < option.priority);
            if(betterIndex || betterPriority) {
                option = newToken;
            }
        }

        var cutout = line.substring(0, (option !== null)?(option.token.index):(line.length));
        if(cutout.length > 0 && cutout.search(/^\x20+$/) === -1) {
            // Error report goes here. Unexpected characters, basically.
            // This should only be entered if the next token found has non-space characters
            // between it and the previous token (or beginning of line). Note: a tab is NOT
            // considered to be a space character. In other words, tabs are not allowed.
            return {kind: "UnexpectedChars", lexeme: cutout, index: 0};
        }
        if(option === null) {
            return null;
        }
        return option.token;
    };
    this.complete = function() {
        for(var i = 0; i < this.indentsInPreviousLine; i++) {
            var prev = this.tokens.pop();
            this.tokens.push({kind:"Dedent", lexeme:"\\d", line: this.lineNumber});
            this.tokens.push(prev);
        }
        if(this.tokens[this.tokens.length-1].kind === "Newline") {
            this.tokens.pop();
        }
        this.tokens.push({kind: "EndOfFile", lexeme:"@EOF"});
        return this.tokens;
    };
};
var Scanner = {
    scan: scan,
    parseTokensToStringFull: parseTokensToStringFull,
    parseTokensToStringPretty: parseTokensToStringPretty,
    parseTokensToStringBest: parseTokensToStringBest,
    parseTokensToStringSpacially: parseTokensToStringSpacially
}

module.exports = Scanner;