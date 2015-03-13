// This really won't be a function when compiled, it'll be
// placed directly into the code as needed.

require('./native.js');

// Considering I already made multiple examples of consumption in ../implideas/consumption.avg,
// I'm going to compile those here, for proof of concept.

// let Circle =
//     _circ: _
//     radius: 50
//     location:
//         x: 5
//         y: 10
//         set: func(point)
//             _ <- point['x', 'y']
//     area: func()
//         ret pow(_circ.radius, 2) * Math.PI
// 
// Circle.location.set({ 'x': 50, 'y': 80})

var Circle = {
    _circ: this,
    radius: 50,
    location: {
        x: 5,
        y: 10,
        set: function(point) {
            var _list_point_comprehend_1 = [];

            _list_point_comprehend_1.push('x');
            _list_point_comprehend_1.push('y');

            log("Test case one comprehend right side output:");
            log(_list_point_comprehend_1);
            log('\n');

            var _list_point_unpacked_1 = [];
            for(var _list_unpack_i1 = 0; _list_unpack_i1 < len(_list_point_comprehend_1); _list_unpack_i1++) {
                _list_point_unpacked_1.push("point['" + _list_point_comprehend_1[_list_unpack_i1] + "']");      // I don't think this will work for strings.
            }

            log("Test case one unpacked right side output:");
            log(_list_point_unpacked_1);
            log('\n');

            var _list_this_consume_unpacked_1 = [];
            for(var _list_unpack_i1 = 0; _list_unpack_i1 < len(_list_point_comprehend_1); _list_unpack_i1++) {
                _list_this_consume_unpacked_1.push("this['" + _list_point_comprehend_1[_list_unpack_i1] + "']");      // I don't think this will work for strings.
            }

            log("Test case one unpacked consume left side output:");
            log(_list_this_consume_unpacked_1);
            log('\n');

            for(var _statement_i1 = 0; _statement_i1 < len(_list_point_unpacked_1); _statement_i1++) {
                eval(_list_this_consume_unpacked_1[_statement_i1] + " = " + _list_point_unpacked_1[_statement_i1]);
            }

            log("Test case one final output:");
            log(this);
            log('\n');
        }
    },
    area: function() {
        return pow(_circ.radius, 2) * Math.PI
    },
}

Circle.location.set({'x': 50, 'y': 80});

// Boom. One successful test done.

// And now, another. This is for consumption into named objects

// let newProps =
//     width: 50
//     y: 70
// 
// let RectangleMaker =
//     _maker = _
//     Rectangle: func(props)
//         _[key] = val for key, val : props                       // This is an experimental idea I had just now. Might be worthwhile.
//     defaultProps:
//         x: 50
//         y: 40
//         width: 100
//         height: 200
//     make: func(props)
//         let rectProps = Object.create(_maker.defaultProps)      // I have absolutely no idea how I intend on implementing this. Currently, object unpacking
//         rectProps <- props[key for key in props]                // is done basically via a macro. This... this isn't a macro. This is at runtime.
//                                                                 
// let rect = RectangleMaker.make(newProps)

var newProps = {
    width: 50,
    y: 70,
};

var RectangleMaker = {
    _maker: this,
    Rectangle: function(props) {
        for(var key in props) {
            var val = props[key];

            this[key] = val;
        }
    },
    defaultProps: {
        x: 50,
        y: 40,
        width: 100,
        height: 200,
    },
    make: function(props) {
        var rectProps = Object.create(_maker.defaultProps);
        
    },
}