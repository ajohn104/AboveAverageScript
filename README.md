#AverageScript

Running on Javascript, _AverageScript_ is a combination of ECMAScript 6, Python, and Lua, with some random changes on the side. Let's get started.

Here's some basic variable code:

```js

    let a = 70;
    a++;
    let b = 60;
    b += a;
    let c = (a > b);
    let d = not c;
    c, d = d, c;                   // The swap is real.

```

Just like in Javascript, _AverageScript_ is object oriented, and includes functions as objects.

```js

    let fib = func(a, amount)      // Functions...
        if(a === 0 or a === 1)
            ret amount;
        end;
        ret fib(a - 1, amount * a);
    end;

    let z = fib(3, 1);

    let Circle = <<                // And Objects!
        radius: 0, 
        location: << 
            x: 0, 
            y: 0,
            toString: func()
                ret "x: " + x + " y: " + y;
            end
        >>,
        getRadius: func()
            ret self.radius;
        end,
        getLocation: func()
            ret self.location;
        end,
        setLocation: func(x, y)
            self["location"].x = x;
            self["location"].y = y;
        end
    >>;

    let Dot = new Circle();        // Constructors and extensibility
    Dot["strokeIsDashed"] = true;
    Dot["color"] = "rgb(0,0,0)";

    let dotExample = new Dot();
    dotExample.radius = 50;
    dotExample.location['x'] = 6;

    let fooBarCommentYACBL = new Dot();

    draw(<< 
        x: 6, 
        y: 10, 
        width: 50, 
        height: 20, 
        color: "red", 
        size: 9, 
        << 
            stroke_style: "dashed", 
            freq: 0.5, 
            color: "red"
        >>
    >>);

    fill(dotExample);

````

Rather than `this`, _AverageScript_ uses `self` to specify the containing object.

An advantage of using _AverageScript_ (by design) is the capability skip unnecessary curly braces, but to still make clear where things start and end. However, semicolons help maintain clarity, so they remain.

Naturally, you can loop in _AverageScript_:

```js

    let c = false;
    let list = [5, 7, 0];
    while( not c )
        c = true;
        for( i : list )
            if( x[i] > 0 )
                x[i]--;
            end;
            c = c and (x[i] === 0);
        end;
    end;

```

Conditionals look a tad different, however.

```js

    let x = parseInt( input("Please enter a number") );
    if( x > 0 )
        console.log("Feeling positive?");
    maybe( x === 0 )
        console.log("Zero? Really?");
    otherwise
        console.log("Don't be so negative");
    end;

```

Comments are casual.

```js

    let TeaScript = "Awesome";     // Shoutouts!
    CoffeeScript = "Casual";       // Variables can be declared without let,
    $ = "$";                       // but its far less clear.

```


Minor notes:  
* Camel Casing is preferred  
* Spacing norm is 4 spaces (NOT TABS)  
* Expect the average