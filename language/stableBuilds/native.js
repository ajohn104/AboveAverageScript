// This isn't so much an attempt as it is just a place to collect 
// all the built-ins so I can grab them more easily, and, more importantly,
// use require to make them available in each implattempt rather than
// copy paste over and over like I've been doing.
// Also, I'm adding them to the global namespace here because it makes the require easier,
// but it in the final implementation from native, that isn't how it will be used. native
// will only place the built-ins in the scope specified. This way, it doesn't pollute
// the global namespace at all. But here I'm allowing it. Because its assumed that native
// won't actually 'require' anything, but quite literally drop them all in with vars.

// _ is gonna hold all the BS that this language uses in the background, because no user can use/make
// variable with that id.
var _ = {};

// Shorter typeof. type(x) translates to -> typeof x
type = function(x) {
    return typeof x;
};

// Returns true if x is undefined.
isUndef = function(x) {
    return type(x) === 'undefined';
};

// Returns a if a has a value other than undefined. If a is undefined, returns the def val.
defaults = function(a, def) {
    return (!isUndef(a) ? a : def);
};

// Returns the length property of the given object.
len = function(arr) {
    return arr['length'];
};

// Similar to len, but instead counts the enumerable properties of the object.
size = function(obj) {
    return len(Object.keys(obj));
};

// Shorter instanceof. isInst(x, y) translates to -> x instanceof y
isInst = function(x, y) {
    return x instanceof y;
};

// Shorter parseInt(x, base);
int = function(x, base) {
    var base = defaults(base, 10);
    return parseInt(x, base);
};

// Shorter parseFloat(x)
float = function(x) {
    return parseFloat(x);
};

// Shorter Math.abs(x)
abs = function(x) {
    return Math.abs(x);
};

// Shorter Math.pow(x, y)
pow = function(x, y) {
    return Math.pow(x, y);
};

// Works exactly like python now. Three ways of calling it:
// range(max) -> returns array from: 0 <= x < max with increments of 1
// range(min, max) -> returns array from: min <= x < max with increments of 1
// range(min, max, delta) -> Conditional:
//      => if delta > 0, returns an array from min <= x < max with increments of delta
//      => if delta < 0, returns an array from max < x <= min with decrements of abs(delta)
//      => if delta == 0, then I hope you like crashing.
range = function() {
    var min = 0, max, delta = 1, array = [];
    if(arguments.length === 1) {
        max = arguments[0];
    } else {
        min = arguments[0];
        max = arguments[1];
    }
    delta = (arguments.length > 2)?arguments[2]:delta;
    var compare = function(val) {
        return (delta >= 0)?(val < max):(val > max);
    };
    var i = min;
    while(compare(i)) {
        array.push(i);
        i+=delta;
    };
    return array;
};

// laziest is a hidden function, which exists only to prevent infinite loops from occurring if the 
// user calls lazy or lazier on log or any other built-in that uses lazy or lazier.
_.laziest = function(call, args) {
    var argString = "";
    for(var i = 0; i < args.length; i++) {
        argString += ", args[" + i + "]";
    }
    argString = argString.substring(2);
    return function() {
        eval("call(" + argString + ");");
    };
};

// lazier is just like lazy, except that instead of an infinite number of arguments, it
// only takes in the function to be called and an array of arguments to call it with.
lazier = function(call, args) {
    return _.laziest(call, args);
};

// lazy is a function that takes in a function as its first param, and any number of arguments as its
// second parameter. It then returns a function that calls the given function with those arguments.
lazy = function(call) {
    var args = [];
    for(var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);                    // Before anyone says "Use the shift method! Array.prototype.shift!",
    }                                               // let me tell you this: arguments ISN'T an array. Mind = blown. 10/10 ign.
    return lazier(call, args);
};

// Shorter version of console.log
log = console.log.bind(console);

// Shorter version of console.error
error = console.error.bind(console);