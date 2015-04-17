// It has been decided that these functions WILL pollute the global namespace. 
// Always. The only thing ***native*** changes is the time they get loaded.

// _ is gonna hold all the BS that this language uses in the background, because no user can use/make
// variable with that id.
var _ = {};

_.global = (typeof window !== 'undefined')?window:global;

// Shorter typeof. type(x) translates to -> typeof x
_.global.type = function(x) {
    return typeof x;
};

// Returns true if x is undefined.
_.global.isUndef = function(x) {
    return (typeof x) === 'undefined';
};

// Returns true if x is undefined.
_.global.isNull = function(x) {
    return x === null;
};

// Returns a if a has a value other than undefined. If a is undefined, returns the def val.
_.global.defaults = function(a, def) {
    return (!(typeof a === 'undefined') ? a : def);
};

// Returns the length property of the given object.
_.global.len = function(arr) {
    return arr['length'];
};

// Similar to len, but instead counts the enumerable properties of the object.
_.global.size = function(obj) {
    return _.global.keys(obj).length;
};

// Shorter instanceof. isInst(x, y) translates to -> x instanceof y
_.global.isInst = function(x, y) {
    return x instanceof y;
};

// Shorter parseInt(x, base);
_.global.int = function(x, base) {
    var base = defaults(base, 10);
    return parseInt(x, base);
};

// Shorter parseFloat(x)
_.global.float = function(x) {
    return parseFloat(x);
};

// Shorter Math.abs(x)
_.global.abs = function(x) {
    return Math.abs(x);
};

// Shorter Math.pow(x, y)
_.global.pow = function(x, y) {
    return Math.pow(x, y);
};

// Works exactly like python now. Three ways of calling it:
// range(max) -> returns array from: 0 <= x < max with increments of 1
// range(min, max) -> returns array from: min <= x < max with increments of 1
// range(min, max, delta) -> Conditional:
//      => if delta > 0, returns an array from min <= x < max with increments of delta
//      => if delta < 0, returns an array from max < x <= min with decrements of abs(delta)
//      => if delta == 0, then I hope you like crashing.
_.global.range = function() {
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
_.global.lazier = function(call, args) {
    return _.laziest(call, args);
};

// lazy is a function that takes in a function as its first param, and any number of arguments as its
// second parameter. It then returns a function that calls the given function with those arguments.
_.global.lazy = function(call) {
    var args = [];
    for(var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);                    // Before anyone says "Use the shift method! Array.prototype.shift!",
    }                                               // let me tell you this: arguments ISN'T an array. Mind = blown. 10/10 ign.
    return lazier(call, args);
};

// Shorter version of console.log
_.global.log = console.log.bind(console);

// Shorter version of console.error
_.global.error = console.error.bind(console);

// Shorter version of the ES6 definition for Object.keys
// As such, primitives other than null and undefined are allowed.
_.global.keys = function(val) {
    var typeval = typeof val;
    if(val === null || typeval === 'undefined') {
        throw new TypeError('built-in keys called on null');
    }
    switch(typeval) {
        case 'function':
            return Object.keys(val);
        case 'object':
            return Object.keys(val);
        case 'string':
            var array = [];
            for(var i = 0; i < val.length; i++) {
                array.push(i);
            }
            return array;
        default:
            return [];
    }
};