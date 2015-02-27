// This isn't really going to be a function when compiled,
// but compiled directly into this. Well, probably.


// Major note: this might actually need to be a function. So, here's the issue:
//  for loops inside of an unpack will presumably produce a series of values. Well
//  if those values are going to work right, the inline and will need to basically
//  create a string representative of the code that would be placed in the -- AGH.
//  lets just make an example and work with that.

// let list = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

// let mod3Times3 = [ (list[i if i % 3 === 0 for i in range(len(list)) ]*3 + 5) * 10]
require('./native.js');

// If it was, to some extent, going to be at compile to to make things better, it would be as follows:

var list = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
var mod3Times3 = [];

// Then, the inner portion.
// First, lets talk about for loops.
// The inline loops have left to right precedent, such that the left most appear as the outermost
// loop. Here's an example:
//      [ a for a in A for a in B]          // Makes an array of the values in A that appear in B
// The leftmost expression, which must exist if its an inline loop, is the only evaluated portion.
// Now, I originally wanted to allow additional values to be in the list notation, but it would 
// just be absorbed by the expression looking for B, so the inline loops must block everything else.

var _list_list_comprehend_1 = [];
var _list_list_1 = range(len(list));
for(var _i1 = 0; _i1 < len(_list_list_1); _i1++) {
    var i = _list_list_1[_i1];
    if(i%3 === 0) {
        _list_list_comprehend_1.push(i);
    }
}

log("Test case one comprehend output:");
log(_list_list_comprehend_1);
log('\n');

var _list_list_unpacked_1 = [];
for(var _list_unpack_i1 = 0; _list_unpack_i1 < len(_list_list_comprehend_1); _list_unpack_i1++) {
    _list_list_unpacked_1.push("list[" + _list_list_comprehend_1[_list_unpack_i1] + "]");
}

log("Test case one unpacked output:");
log(_list_list_unpacked_1);
log('\n');


for(var _list_i1 = 0; _list_i1 < len(_list_list_unpacked_1); _list_i1++ ) {
    eval( "mod3Times3.push( (" + _list_list_unpacked_1[_list_i1] + "*3 + 5 )*10 );");
}

log("Test case one final output: ");
log(mod3Times3);
log('\n');

// if, for instance, we wanted to do the let inBoth = [a for a in A for a in B] example shown above, it would
// compile into:

var A = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45];
var B = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48];

var inBoth = [];

var _list_inBoth_comprehend_1 = [];
var _list_inBoth_1 = A;
var _list_inBoth_2 = B;
for(var _a1 = 0; _a1 < len(_list_inBoth_1); _a1++) {
    var a1 = _list_inBoth_1[_a1];
    for(var _a2 = 0; _a2 < len(_list_inBoth_2); _a2++) {
        var a2 = _list_inBoth_2[_a2];
        if(a1 === a2) {
            _list_inBoth_comprehend_1.push(a1);
            break;
        }
    }
}

log("Test case two comprehend output:");
log(_list_inBoth_comprehend_1);
log('\n');

for(var _inBoth_i1 = 0; _inBoth_i1 < len(_list_inBoth_comprehend_1); _inBoth_i1++) {
    inBoth.push(_list_inBoth_comprehend_1[_inBoth_i1]);
}

log("Test case two final output: ");
log(mod3Times3);
log('\n');


// Now, a more viable example:
// let numbers = [11, 22, 33, 44, 55, 66, 77, 88, 99]
// numbers[i for i in range(len(numbers))] += numbers[j + 3 if (j + 3) < len(numbers) else j + 3 - len(numbers) for j in range(len(numbers))]

var numbers = [11, 22, 33, 44, 55, 66, 77, 88, 99];

var _list_numbers_comprehend_1 = [];
var _list_numbers_1 = range(len(numbers));
for(var _i1 = 0; _i1 < len(_list_numbers_1); _i1++) {
    var i = _list_numbers_1[_i1];
    _list_numbers_comprehend_1.push(i);
}

console.log("Test case three comprehend left side output:");
console.log(_list_numbers_comprehend_1);
console.log('\n');

var _list_numbers_unpacked_1 = [];
for(var _list_unpack_i1 = 0; _list_unpack_i1 < len(_list_numbers_comprehend_1); _list_unpack_i1++) {
    _list_numbers_unpacked_1.push("numbers[" + _list_numbers_comprehend_1[_list_unpack_i1] + "]");
}

log("Test case three unpacked left side output:");
log(_list_numbers_unpacked_1);
log('\n');


var _list_numbers_comprehend_2 = [];
var _list_numbers_2 = range(len(numbers));
for(var _j1 = 0; _j1 < len(_list_numbers_1); _j1++) {
    var j = _list_numbers_2[_j1];
    if((j + 3) < len(numbers)) {
        _list_numbers_comprehend_2.push(j + 3);
    } else {
        _list_numbers_comprehend_2.push(j + 3 - len(numbers));
    }
}

log("Test case three comprehend right side output:");
log(_list_numbers_comprehend_2);
log('\n');

var _list_numbers_unpacked_2 = [];
for(var _list_unpack_i1 = 0; _list_unpack_i1 < len(_list_numbers_comprehend_2); _list_unpack_i1++) {
    _list_numbers_unpacked_2.push("numbers[" + _list_numbers_comprehend_2[_list_unpack_i1] + "]");
}

log("Test case three unpacked right side output:");
log(_list_numbers_unpacked_2);
log('\n');

for(var _statement_i1 = 0; _statement_i1 < len(_list_numbers_unpacked_1); _statement_i1++) {
    eval(_list_numbers_unpacked_1[_statement_i1] + " += " + _list_numbers_unpacked_2[_statement_i1]);
}

log("Test case three final output:");
log(numbers);
log('\n');

// And lastly, an example for passing these in to function calls:
// let car =
//     _car: _
//     x: 50
//     y: 70
//     color: 'blue'
//     owner: 'Sam'
//     sell: func(newOwner)
//         _car['owner'] = newOwner
//         return _car
// log(car[key for key: car])
// 

var car = {
    _car: this,
    x: 50,
    y: 70,
    color: 'blue',
    owner: 'Sam',
    sell: function(newOwner) {
        _car['owner'] = newOwner;
        return _car;
    },
};


var _list_car_comprehend_1 = [];
for(var _key1 in car) {         // I know this could directly be 'key', but I want some symmetry between all loops when compiled.
    var key = _key1;
    _list_car_comprehend_1.push(key);   
}

log("Test case four comprehend output:");
log(_list_car_comprehend_1);
log('\n');

var _list_car_unpacked_1 = [];
for(var _list_unpack_i1 = 0; _list_unpack_i1 < len(_list_car_comprehend_1); _list_unpack_i1++) {
    _list_car_unpacked_1.push("car['" + _list_car_comprehend_1[_list_unpack_i1] + "']");
}

log("Test case four unpacked output:");
log(_list_car_unpacked_1);
log('\n');

var _args_1 = [];
for(var _args_i1 = 0; _args_i1 < len(_list_car_unpacked_1); _args_i1++) {
    eval("_args_1.push(" + _list_car_unpacked_1[_args_i1] + ");");
}

log("Test case four final output:");
lazy(log, _args_1)();
log('\n');

// In order for this to work, the loop comprehension would need to return an array of values.
// This is also how the compiler will read and compile unpacking when the whole thing is given,
// that way they are in unison.

// Ok, so, after some intense analysis, I know how this can not only work, but can work
// almost entirely at compile time, and minimize use of eval. I'm actually quite happy with 
// how this turned out, even if I can't quite make the full compiler for it yet. Well, I can,
// but I have other stuff to do.

// Ok, I tested all non-consumption uses besides those that don't use loop comprehensions.
// Because those are MUCH easier. They just get an array.push for each explicitly declared
// element in an array. Meaning the ones that aren't loop comprehensions.

// Seriously though, this was hard to implement in a way that will work in any situation. But
// I'm confident that this is close to perfect if not perfect. I know the inline conditional is
// pointless since there's already the ?: operator, but I don't really care. Preference is key.