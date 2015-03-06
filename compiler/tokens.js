var Tokens = {
    Indent: 
        ["    "],
    Separator: 
        [".", "{", "}", "[", "]", "(", ")", ":", ",", ";"],
    OneCharacterOperators: 
        ["+", "-", "~", "/", "*", "%", "<", ">", "&", "|", "^", "?", "="],
    TwoCharacterOperators: 
        ["<-", "->", "++", "--",  "<=", ">=", "==", "<<", ">>", "*=",
         "/=", "%=", "+=", "-=", "^=", "!="],
    ThreeCharacterOperators: 
        ["!==",  "===", "<<<", ">>>", "<<=", ">>="],
    FourCharacterOperators: 
        [ "<<<=", ">>>="],
    WordOperators:
        ["not", "and", "or"],
    Reserved:
        ["let", "_", "for", "in", "end", "if", "elif",
         "else", "stop", "skip", "do", "while", "ret",
         "switch", "case", "new", "func"],
    Comment: 
        ["//", "/*", "*/"],
    Native:
        ["***native***"],
    BoolLit: 
        ["true", "false"],
    Unused:
        ["break", "class", "const", "continue", "debugger", 
        "default", "delete", "export", "extends", "function", 
        "import", "instanceof", "super", "this", "typeof", 
        "var", "void", "with", "return", "try", "catch", "throw", "finally"]
};

// ErrUC = Error: Unexpected Characters, ErrUR = Error: Unused Reserved
Tokens.kinds = 
    [{ kind:"Newline", abbr: null}, {kind:"UnexpectedChars", abbr:"ErrUC"}, {kind:"Indent", abbr:null},
     {kind:"Id", abbr: "Id"}, {kind:"Reserved", abbr: null}, {kind:"Unused", abbr: "ErrUR"},
     {kind:"Comment", abbr: undefined}, {kind:"Separator", abbr: null}, {kind:"Operator", abbr: null},
     {kind:"Native", abbr: null}, {kind:"BoolLit", abbr: "Bool"}, {kind:"IntLit", abbr: "Int"},
     {kind:"StrLit", abbr: "Str"}, {kind:"RegExpLit", abbr: "Rgx"}, {kind:"Dedent", abbr: null, display: "\\d"} ];

module.exports = Tokens;