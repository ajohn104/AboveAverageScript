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
                var characterNumber = line.indexOf(Tokens.Comment[2]);
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
    // ...I found a way without using negative lookaheads. 6 lines. Boom.
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
        return getMatch(line, "BoolLit", true);
    };
    var getNativeMatch = function(line) {
        return getMatch(line, "Native", false);
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
    var getCommentMatch = function(line) {
        return getMatch(line, "Comment", false);
    };
    var getReservedMatch = function(line) {
        return getMatch(line, "Reserved", true);
    };
    var getUnusedMatch = function(line) {
        return getMatch(line, "Unused", true);
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