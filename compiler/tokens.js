var Tokens = {
    AlwaysSolo:
        [".", "{", "}", "[", "]", "(", ")", ";", ":", ","],
    Operators:
        ["++", "--", "+", "-", "~", "/", "*", "%", "<", ">", "<=", 
        ">=", "==", "===", "<<", ">>", "<<<", ">>>", "&", "|", "^", 
        "?", "=", "*=", "/=", "%=", "+=", "-=", "<<=", ">>=", "<<<=", 
        ">>>=", "^=", "not", "or", "and"],
    Reserved:
        ["type", "defaults", "int", "float", "log", "is", "let", 
        "_", "for", "in", "of", "len", "end", "if", "elif", "else", 
        "stop", "skip", "do", "while", "try", "catch", "throw", "ret",
        "finally", "return", "switch", "case", "del", "new", "func"],

    Unused:
        ["break", "class", "const", "continue", "debugger", 
        "default", "delete", "export", "extends", "function", 
        "import", "instanceof", "super", "this", "typeof", 
        "var", "void", "with"]
};

module.exports = Tokens;