// A few quick ones:


// Turn parseInt(x), parseFloat(y), and (z == "true") into
//       int(x)         float(y)           bool(z)
// Doubles don't recieve the same treatment, since "technically"
// only one number type exists in Javascript.
// However, each function should have the option of getting the
// additional parameter for the base (ie: 10, 2, 16, 8, 13 even)
// In Javascript code:

// The type keyword would also be function ified.
var _type = function(x) {
    return typeof x;
};

// defaults will be a built-in
var _defaults = function(a, def) {
    return (_type(a) !== 'undefined' ? a : def);
};

var _int = function(x, base) {
    var base = _defaults(base, 10);
    return parseInt(x, base);
}

var _float = function(x) {
    var base = _defaults(base, 10);
    return parseFloat(x);
}

// console.log will be shortened to just log, to speed up debugging
var _log = function(x) {
    console.log(x);
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

// Also, give the user the option to add in "**native**" into their code
// which will tell the compiler where to place the background functions
// in case they want it to be onload. However, that means that all
// functions will need to be added as properties to an object _global,
// which would be no matter what added outside of any onload, and then 
// the functions would be called from that.
// In AVG code, it would look like:

***native***

// Followed by code. It even be wrapped in JQuery, etc such as:

$( function() <<
    ***native***

>>

// This would place it in an onload state.


var Door = {
    x: 0,
    self: this,
    isInside: false;
    goThrough: function() {
        isInside = not isInside;
        console.log("MAGIC!!");
    },
    narnia: {
        leave: function() {
            self.goThrough();// Now call goThrough from Door or reference inInside
            ...goThrough();

        }
    }
}

Door.narnia.jumpOut = function() {
    ...goThrough();
}



var Circle = {
    x: 0,
    y:0,
    setCenter: function(newX,newY) {
        this.x = x;
        this.y = y;
    }
}

Door.narnia.setX = Circle.pointFuncs.setX;

var circ = new Circle();

var myDoor = new Door();



var reallyLongNameForAPointBecauseItCanExist = {
    REALLYLONGNAMEFORx: 7,
    EXTRALONGNAMEFORy: 10,
    SUUUUUUUUUUUUUUUPERLongRadius: 6,
    
}

circ.setCenter(reallyLongNameForAPointBecauseItCanExist.REALLYLONGNAMEFORx, reallyLongNameForAPointBecauseItCanExist.EXTRALONGNAMEFORy);

circ.setCenter(reallyLongNameForAPointBecauseItCanExist**{"REALLYLONGNAMEFORx","EXTRALONGNAMEFORy"});
circ.setCenter(reallyLongNameForAPointBecauseItCanExist**);
