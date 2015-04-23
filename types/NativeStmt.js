// NativeStmt      ::= '***native***'
var compile = function(write, scope, indents, indentsHidden) {
    scope = scope.clone();
    var fs = require('fs'),
        byline = require('byline');
    var stream = fs.createReadStream(__dirname + '/../language/implattempts/native.js');
    stream = byline.createStream(stream, { encoding: 'utf8', keepEmptyLines: true });
    scope.pause();
    stream.on('readable', function() {
        var line;
        while (null !== (line = stream.read())) {
            scope.writeImmediately(scope.ind(indents) + line + '\n');
        }
    });
    stream.on('end', function() {
        scope.writeImmediately('\n' +  scope.ind(indentsHidden) + '// ----End of Built in\'s---\n\n\n');
        scope.resume();
    });
};

module.exports = function(env, at, next, debug) {
    return {
        loadData: function() {},
        is: function() {
            var found = at('***native***');
            if(found) {
                env.last = new NativeStmt();
                env.nativeSpecified = true;
            }
            return found;
        },
        compile: compile
    };
};

var NativeStmt = function() {
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "***native***";
        return out;
    };
    this.compile = compile;
};