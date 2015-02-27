
// Ok, this works. It's also probably exactly how I will implement it in the language.

// It takes in a function, then any number of arguments to pass
// to that function in the order they were passed to lazy
var defaults = function(a, def) {
    return (type(a) !== 'undefined' ? a : def);
};

var len = function(a) {
    return a['length'];
};

var lazy = function(call, args) {
    var call = defaults(call, arguments[0]);
    var args = defaults(args, arguments.shift);
    var argString = "";
    for(var i = 0; i < len(args); i++) {
        argString += ", args[" + i + "]";
    }
    argString = argString.substring(2);
    return function() {
        eval("call(" + argString + ");");
    };
};

var log = function() {
    lazy(console.log, arguments)();
};

var error = function() {
    lazy(console.error, arguments)();
};

// And now, a test to make sure it works.

var list = ["switch", "phone", "click", "shame"];

var clipDupStrList = function(list, start, end, repeats) {
    for(var i = 0; i < list.length; i++) {
        var str = list[i].substring(start, end);
        var strComp = "";
        for(var j = 0; j < repeats; j++) {
            strComp += str;
        }
        list[i] = strComp;
    }
}

var callFunc = function(otherParameters, call) {
    console.log("Before:" + list);
    call();
    console.log("After: " + list);
}

var lazyClip = lazy(clipDupStrList, list, 1, 4, 3);

callFunc("Here are some other parameters", lazyClip);