// A few quick ones:


// Turn parseInt(x), parseFloat(y), and (z == "true") into
//       int(x)         float(y)           bool(z)
// Doubles don't recieve the same treatment, since "technically"
// only one number type exists in Javascript.
// However, each function should have the option of getting the
// additional parameter for the base (ie: 10, 2, 16, 8, 13 even)
// --> These will be added. Confirmed by Albert.
// In Javascript code:

// The type keyword would also be function ified.
var type = function(x) {
    return typeof x;
};

// defaults will be a built-in
var defaults = function(a, def) {
    return (type(a) !== 'undefined' ? a : def);
};

var int = function(x, base) {
    var base = defaults(base, 10);
    return parseInt(x, base);
}

var float = function(x) {
    var base = defaults(base, 10);
    return parseFloat(x);
}

// console.log will be shortened to just log, to speed up debugging
var log = function(x) {
    console.log(x);
};

// instanceof is shorted to a function 'is', which checks the first arg against the second arg
var is = function(x, y) {
    return x instanceof y;
};

// In AVG code:

let val_A = "60.7";
let val_B = "AB";
let val_C = "67.8";
let val_D = false;

// prints 60
log( int(val_A) );

// prints 171
log( int(val_B) );

// prints 67.8
log( float(val_C) );

// prints 'boolean'
log( type(val_D) );

// prints 10
log( defaults(value, 10) )

// prints true
log( is({}, Object) );

// Also, give the user the option to add in "**native**" into their code
// which will tell the compiler where to place the background functions
// in case they want it to be onload. However, that means that all
// functions will need to be added as properties to an object _global,
// which would be no matter what added outside of any onload, and then 
// the functions would be called from that.
// --> This will be added. Confirmed by Albert.
// In AVG code, it would look like:

***native***

// Followed by code. It even be wrapped in JQuery, etc such as:

$( function() {
    ***native***

});

// This would place it in an onload state.

// Here we have object unpacking. This concept is confirmed by Albert to be added, however the syntax
// and limitations have yet to be decided. Due to the possibility that other (non AVG) code may be
// used, we cannot guarantee that all objects will have enumerable properties, via the order they were 
// added. Also, we cannot guarantee the ability to place javascript inside of nonlocal functions. So, 
// the likely solution is to require the user to specify the variables they want unpacked, in the order
// they want it unpacked. 
var reallyLongNameForAPointBecauseItCanExist = {
    REALLYLONGNAMEFORx: 7,
    EXTRALONGNAMEFORy: 10,
    SUUUUUUUUUUUUUUUPERLongRadius: 6
}

this.lip = new Lip(settings.loc.{'x','y'}, width, height, settings.ctx );
//this.lip = new Lip(settings.{ loc.{x,y}, ctx}, width, height);
// in code, this could be new Lip(settings.{loc['x'], loc['y']}, width, height, settings.ctx);
// then finally new Lip(settings.loc['x'], settings.loc['y'], width, height, settings.ctx);
// this would occur b/c the code would translate directly into the object being unpacked '.' 
// all of the named properties.

// Originally:
var scale = this.settings.scale;
var width = this.curWidth*scale;
var height = this.curHeight*scale;
this.lip = new Lip(this.settings.loc.x,this.settings.loc.y}, width, height, this.settings.ctx);


// Now its this code:
let width, height = _.settings.loc['curWidth', 'curHeight']*_.settings.scale;
_.lip = new Lip(_.settings.loc['x', 'y'], width, height, _.settings.ctx);
// ...which compiles into:
var width = this.curWidth*this.settings.scale;
var height = this.curHeight*this.settings.scale;
this.lip = new Lip(this.settings.loc.x, this.settings.loc.y, width, height, this.settings.ctx );


circ.setCenter(reallyLongNameForAPointBecauseItCanExist.REALLYLONGNAMEFORx, reallyLongNameForAPointBecauseItCanExist.EXTRALONGNAMEFORy);

circ.setCenter(reallyLongNameForAPointBecauseItCanExist.{REALLYLONGNAMEFORx,EXTRALONGNAMEFORy});


// for loops:
let y = ["true", "false", true, 0, 9, {}];

// for..in -> iterates over property names of object
for(x in y) log(x) end  // prints: 0, 1, 2, 3, 4, 5
// so, for( x in y) translates directly into JS. Order not guaranteed, however.

// for..of -> iterates over property values of object
for(x of y) log(x) end  // prints: "true", "false", true, 0, 9, {}
// so, for(x of y) becomes for(x in y) { x = y[x] }; ...user input... }


// for..:  -> iterates over key-value pairs?
for(x :  y) log(x) end  // prints: {key: 0, val:"true"}, {key:1, val:"false"}, {key:2, value:true}, {key:3, val:0}, {key:4, val:9}, {key:5, val:{}}
// so, for(x : y) becomes for(x in y) { x = { key: x, val: y[x] }; ...user input... }


// len, rather than .length or otherwise. This method will attempt to find a .length property, and will
// default to getting the object's key array length.

let x = len(y); // x is now 6, y.length;
let x = len({blue: "fox", "candy": true, 0: 9, undefined: "willsmith"}); // x is now 4, Object.keys(y).length

// in the JS side of things, it would look like:

var len = function(arr) {
    if(arr.hasOwnProperty('length')) {
        return arr.length;
    } else {
        return Object.keys(arr).length;
    }
}

// ...meaning the programmer can set their own length property to track with len. Cool, huh? However,
// it is still up to the programmer to make length not be an enumerable property.

do { ...stuff...} while(x); 

// Just the basic do-while.

del("x", y);     // deletes property x from y

// ...in JS:

var del = function(prop, obj) {
    delete obj[prop];
}

// A new way to declare locals

<- obj['prop1', 'prop2', 'prop3'];


// A new way to assign to properties (in this example, to 'this')

_ <- obj['prop1', 'prop2', 'prop3'];

// Or, perhaps to circle:

circ <- obj['prop1', 'prop2', 'prop3'];

// Lastly, the addition of minor list comprehension.
let oldList = ["true", false, "9", "8", 7, null];
let newList = [ oldList[0..len(oldList)] ];                     // this would probably be done as a for loop, 
let altList = [ oldList[ i for i in range(len(oldList)) ] ]              // if this is going to stay a macro. 

// The .. operator would be inclusive-exclusive. AKA a <= i < b


// Fully indentation based (other than objects, as per usual). Via the 
// concept that an indent means the continuation of something, and more
// specifically a dedent means the end of something. So, if an indentation
// occurs, then whatever came before simply continues on. When a dedent
// occurs, the most recently indented thing comes to a close.

// Now, in order to make it less hard coded, it should follow one simple
// rule: An indentation occurs when a block is expected or when the user
// wishes to indicate an unfinished expression. However, this creates issues
// that would be resolved (I think) if it were relaxed to only specifying
// blocks and their start/ends. However, that also creates issues. This is
// because users might want to then use style for some of their objects or
// array definitions, which it would then expect to be a block.

// Refer to ./implideas/indents.avg for full indentation implementation breakdown

// Another thing...coffeescript has the option to refer to variables in strings quickly
// via #{variablename}. Maybe AVG can have @{variablename}? Or even use #?

// range(a,b) built-in? Which produces an array of length b - a of numbers
// from a <= i < b. This would have to be accessed via a for..of in order to
// maintain symmetry with ECMAScript 6. I don't have it in me to do it the
// pythonic way. It would go against everything AVG stands for.

// Generators, Iterators, that whole thing. But done the ECMASCript 6 way, 
// if it's different from python. Ideally, if the web ever upgrades to 
// EMCAScript 6 fully, my language won't feel any different. In fact, it
// would ideally feel more at home, since it would be even closer to the norm.
// However, Generators would require some decent code on my part to attempt to
// recreate effectively for lazy evaluation. That, and making things appear at
// the same time. Not sure how at the moment, but I'll think about it later.

// I think it's time to start looking at other languages and what I could add,
// remove, and change. I'm pretty happy with the overall syntax changes I've made
// but now its time to look into some built-ins and other such things I could add.
// Languages to definitely look into: Python, ECMAScript 6, CoffeeScript, and Ruby.
// Other possibilities: Java, Dart, MATLAB (surprised?), C++, Swift (maybe.), Rust, 
// Go, and finally, a final few, from Toal: Lua, IO, Smalltalk, Factor, Clojure,
// Elm, Elixir, and Julia. I particularly suggest IO, and perhaps Clojure, Elixir,
// Lua, and Julia.

// Ideas found: 
//      built-in functions:
//          => max and min from Python. Lazily evaluated on an array (or object) (and possibly generators)
//          => sum from Python. Lazily evaluated, preferably with a generator if that gets added.
//          => all and any from Python. Lazily evaluated on an array (or object) (and possibly generators)
//              -> Javascript already has this, but I think all and any sound better than every and some
//          => stringify, from JSON. Difference being the parameters, which should now allow settings for spacing after commas, etc
//          => abs and pow from Python. Just a shorter way to write Math.abs and Math.pow
//          => round from Python. Such that it can also take in a second param for the number of digits to right of
//              decimal point to round to. Should be capable of rounding down and up. Rounds up at and above 5 as the
//              final digit. Possibly add floor and ceiling built-in's to allow users to force down or up?
//          => lazy from me. Caller should pass in a function and an array of parameters in their call order, and in return
//              they would get a function that will call the function they gave it with the parameters they gave it when called.

// Screw it. Since I'm going to rewrite the scanner anyways, I should add '!=' and '!=='
// back into the language. 'not(x === y)' seems unnecessary compared to 'x !== y'

// Syntax checking means a '-s' parameter option to print out "syntax ok" if syntax
// is fine or a list of issues if the syntax is incorrect. This is for HW 2.

// for loop notes: have 'for..:' be the property keys, and 'for..in' be the property values or key, value assigned simultaneously.
//  -> Just drop 'for..of' entirely. You don't need to make the same mistake Javascript made.

var proposedIdeas = {
    whitespace_syntax: "Convert the language to a indentation based syntax for blocks and such",
    parenthesis_freedom: "if, elif, while, and for don't need parenthesis (parsed as part of the expression if found)",
    range_built_in: "Make range a built-in, which produces an array of numbers based on its input",
    property_consumption: "An operator that allows for the quick loading of properties into an object or environment",
    not_equal_comparator: "Bring back the !== and !=== operators",
    variable_reference_in_strings: "Add a variable reference syntax in strings to make strings more...convenient",
    generators_and_iterators: "Add generators (and possibly iterators) to allow for lazily evaluated loops and such",
    for_loops_naturalization: "Figure out what feels best between for..in and for..of to optimize how natural they feel to use",
    keep_object_braces_option: "Even with the whitespace_syntax, objects should still be allowed to be defined with {}'s",
    inline_conditionals: "Pythonic 'x if y else z' as a second option for a conditional ?:",
    inline_loops: "expr for condit, do expr while condit, expr while condit. All added as short, one expression loops",
    loop_comprehension: "[x for x in y], etc that should be able to create arrays AND be used with object_unpacking, and possibly 'x if y else z' expressions",
    regex_js_style: "Bring back JavaScript's usual regex syntax, aka /stuff/",
    direct_pair_for_loop: "Support a 'for key, val: props' form of a for loop, where the user immediately gets the pairs as two variables"
};

var successfullyTestedIdeas = {
    lazy_built_in: "./implattempts/lazy.js",
    whitespace_syntax: "./implideas/indents.avg",
    unpacking: "./implideas/unpacking.js",

}

var confirmedIdeas = {
    object_unpacking: "Done via the object[props] method. Converts directly into js as seen above",
    built_ins: "type, defaults, int, float, is, and log are now built-ins, and are auto-added to the compiled script",
    built_in_placement: "***native*** will be used to specify the location the built_ins will be added",
    underscore_to_this: "'_' in any context now refers to 'this' for that context. A straight translation.",
    multiline_comments: "Comments will include both // and /* */",
    pythonic_conditionals: "conditions to be if, elif, else",
    break_addition: "'break' will be added as 'stop'",
    continue_addition: "'continue' will be added as 'skip'",
    regex_addition: "regex will be ignored, since RegExp is a JS object that accepts strings for constructors",
    for_loops_expansion: "for loops get for..in, for..of, and for..:",
    len_built_in: "len will be a built-in function that works according to the rules found above",
    do_while: "do-while's will be available.",
    try_catch_finally: "Since JS has this, we must also have it.",
    switch_statements: "JS has this, and we should as well",
    del_built_in: "del is the function for delete"
}
