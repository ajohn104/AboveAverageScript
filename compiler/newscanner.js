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

var tokensToStringFull = function(tokens){
    var str = "";
    for(var i = 0; i < tokens.length; i++ ) {
        str += tokens[i]['kind'] + "( '" + tokens[i]['lexeme'] + "' ), ";
    }
    return str;
};

var tokensToStringPretty = function(tokens) {
    var str = "";
    for(var i = 0; i < tokens.length; i++ ) {
        if(tokens[i]['kind'] === 'Newline') {
            str += "\n\'\\n\'";
        } else if(tokens[i]['kind'] === "Indent") {
            str += " \'\\t\'";
        } else {
            str += " \'"+ tokens[i]['lexeme'] + "\'";
        }
    }
    return str;
};

var tokensToStringBest = function(tokens) {
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

var LineScanner = function() {
    this.currentLine = null;
    this.lineNumber = 0;
    this.inMultilineComment = false;
    this.tokens = [];
    this.nextLine = function(line) {
        var contentHasAppeared = false;
        this.lineNumber++;
        while(line.length > 0) {
            if(!this.inMultilineComment) {
                var token = this.getNextToken(line, contentHasAppeared);
                if(token === null) {
                    break; // I doubt this will ever happen, but I think it would
                    // if there was an unnessary space at the end of the line.
                }
                if(this.isSinglelineComment(token)) {
                    line = "";
                    break;
                } 
                if(this.isMultilineComment(token)) {
                    this.inMultilineComment = true;
                    line = line.substring(2);
                    continue;
                }
                contentHasAppeared = (!this.isIndent(token))?true:contentHasAppeared;
                this.tokens.push(token);
                line = line.substring(token.lexeme.length + token.index);
                continue;
            } else {
                var characterNumber = line.indexOf(Tokens.Comments[2]);
                if(characterNumber >= 0) {
                    this.inMultilineComment = false;
                    line = line.substring(characterNumber+2);
                } else {
                    line = "";
                    break;
                }
            }
        }
        if(!this.inMultilineComment) {
            var token = {kind: "Newline", lexeme:"\\n"};
            this.tokens.push(token);
        }
    };
    this.isSinglelineComment = function(token) {
        return token.lexeme === Tokens.Comments[0];
    };
    this.isMultilineComment = function(token) {
        return token.lexeme === Tokens.Comments[1];
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
                arrayIndex = (wordBreak)?i:arrayIndex;
            }
        }
        return (!wordBreak)?index:{index: index, arrayIndex:arrayIndex};
    };
    // I'm sure I could have used negative lookaheads to do this in about 5
    // lines, but I don't feel confident enough to use them. Ever.
    var getStringMatch = function(line) {
        var doubleQuotes = line.search(/\"/);
        var singleQuote = line.search(/\'/);
        var start = null
        var token = null;
        var offset = 0;
        if(singleQuote < 0 && doubleQuotes < 0) return token;
        var single = (singleQuote > 0 && singleQuote < doubleQuotes); 
        start = singleQuote;
        var endQuote = single?"\'":"\"";
        var newLine = line.substring(1);
        var end = null;
        while(end === null) {
            end = (single)?newLine.search(/\'/):newLine.search(/\"/);
            if(end === -1) return {kind: "OpenString", lexeme: "ERROR"};
            if(end > 0 && newLine.substring(end-1, end+1) === "\\" + endQuote) {
                offset += end + 1;
                newLine = substring(end+1);
                end = null;
            } else {
                end += offset;
            }
        }
        token = {kind: "StrLit", lexeme: line.substring(start, end+1), index: start};
        return token;
    };
    // ...I found a way without using negative lookaheads. 6 lines. Boom.
    // I'm going to keep the previous one around for reference until I
    // feel comfortable removing it. Basically, whenever I finish testing.
    var getStrRegexMatch = function(line) {
        var start = null;
        var matchIndex = line.search(/(\"(.+?[^\\])?\")|(\'(.+?[^\\])?\'')/);
        if(matchIndex === -1) return null;
        var match = line.match(/(\"(.+?[^\\])?\")|(\'(.+?[^\\])?\'')/)[0];
        var token = {kind: "StrLit", lexeme: match, index: matchIndex};
        return token;
    };
    var getIntMatch = function(line) {
        var start = null;
        var matchIndex = line.search(/[+-]?(0x[a-f0-9]+)|(\d+(\.\d+)?(e\d+)?)/i);
        if(matchIndex === -1) return null;
        var match = line.match(/[+-]?(0x[a-f0-9]+)|(\d+(\.\d+)?(e\d+)?)/i)[0];
        var token = {kind: "IntLit", lexeme: match, index: matchIndex};
        return token;
    };
    var getBoolMatch = function(line) {
        var matchIndexes = getBestMatch(line, Tokens.Bool, true);
        var matchIndex = matchIndexes['index'];
        if(matchIndex === -1) return null;
        var size = Tokens.Bool[matchIndexes['arrayIndex']].length;
        var match = line.substring(matchIndex, matchIndex + size);
        var token = {kind: "BoolLit", lexeme: match, index: matchIndex};
        return token;
    };
    var getNativeMatch = function(line) {
        var matchIndex = getBestMatch(line, Tokens.Native);
        if(matchIndex === -1) return null;
        var match = line.substring(matchIndex, matchIndex + Tokens.Native[0].length);
        var token = {kind: "Native", lexeme: match, index: matchIndex};
        return token;
    };
    var getOperatorMatch = function(line) {
        var matchIndex, size;
        matchIndex = getBestMatch(line, Tokens.OneCharacterOperators);
        if(matchIndex >= 0) size = 1;
        [Tokens.TwoCharacterOperators, Tokens.ThreeCharacterOperators, Tokens.FourCharacterOperators]
            .forEach(function(array, newSize) {
                newSize += 2;
                var newMatchIndex = getBestMatch(line, array);
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
        var matchIndex = getBestMatch(line, Tokens.Separators);
        if(matchIndex === -1) return null;
        var token = {kind: "Separator", lexeme: line.charAt(matchIndex), index: matchIndex};
        return token;
    };
    var getCommentMatch = function(line) {
        var matchIndex = getBestMatch(line, Tokens.Comments);
        if(matchIndex === -1) return null;
        var token = {kind: "Comment", lexeme: line.substring(matchIndex, matchIndex+2), index: matchIndex};
        return token;
    };
    var getResMatch = function(line, kind) {
        var matchIndexes = getBestMatch(line, Tokens[kind], true);
        var matchIndex = matchIndexes['index'];
        if(matchIndexes['index'] === -1) return null;
        var size = Tokens[kind][matchIndexes['arrayIndex']].length;
        var token = {kind: kind, lexeme: line.substring(matchIndex, matchIndex + size), index: matchIndex};
        return token;
    };
    var getReservedMatch = function(line) {
        return getResMatch(line, "Reserved");
    };
    var getUnusedMatch = function(line) {
        return getResMatch(line, "Unused");
    };
    var getIdMatch = function(line) {
        var start = null;
        var matchIndex = line.search(/[_$a-z][$\w]*(?=[^$\w])/i);
        if(matchIndex === -1) return null;
        var match = line.match(/[_$a-z][$\w]*(?=[^$\w])/i)[0];
        var token = {kind: "Id", lexeme: match, index: matchIndex};
        return token;
    };
    var getIndentMatch = function(line) {
        var start = null;
        var indent = Tokens.Indent[0];
        var matchIndex = line.search(new RegExp(indent));
        if(matchIndex !== 0) return null;
        var match = indent;
        var token = {kind: "Indent", lexeme: match, index: matchIndex};
        return token;
    };
    this.getNextToken = function(line, contentHasAppeared) {
        var token = null;
        token = getIndentMatch(line);
        if(!contentHasAppeared && token !== null && token.index === 0) {
            return token;
        }
        var tokenFunctions = [
            getReservedMatch, getUnusedMatch, getStrRegexMatch, getBoolMatch,
            getCommentMatch, getNativeMatch, getOperatorMatch, getSeparatorMatch,
            getStrRegexMatch, getIntMatch, getIdMatch
        ];
        var tokenOptions = [];
        for(var i = 0; i < tokenFunctions.length; i++) {
            var token = tokenFunctions[i](line);
            if(token !== null) {
                var priority = "" + i;          // To prevent the object from changing to the value of i from the loop as it changes.
                tokenOptions.push({token:token, priority: priority});
            }
        }
        token = null;
        for(var j = 0; j < tokenOptions.length; j++) {
            var newToken = tokenOptions[j];
            if(token === null) {
                token = newToken;
                continue;
            }
            var betterIndex = newToken.token.index < token.token.index;
            var betterPriority = (newToken.token.index === token.token.index) && (newToken.priority < token.priority);
            if(betterIndex || betterPriority) {
                token = newToken;
            }
        }
        if(token === null) return null;
        var cutout = line.substring(0, token.token.index);
        if(cutout.length > 0 && cutout.search(/^\x20+$/) === -1) {
            // Error report goes here. Unexpected characters, basically.
            // This should only be entered if the next token found has non-space characters
            // between it and the previous token (or beginning of line). Note: a tab is NOT
            // considered to be a space character. In other words, tabs are not allowed.
            return {kind: "UnexpectedChars", lexeme: cutout, index: 0};
        }
        return token.token;
    };
    this.complete = function() {
        return this.tokens;
    };
};
var Scanner = {
    scan: scan,
    tokensToStringFull: tokensToStringFull,
    tokensToStringPretty: tokensToStringPretty,
    tokensToStringBest: tokensToStringBest
}

module.exports = Scanner;