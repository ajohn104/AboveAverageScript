#AboveAverageScript

Javascript forcefully mutated into a syntactically beautiful language. This is _AboveAverageScript_. Formed from a mixture of ECMAScript 6, Python, and CoffeeScript, _AboveAverageScript_ forces you to space your code perfectly, without confining you to one specific style for doing so. In addition, several new operators await you, allowing you to hastily deal with objects and properties. Give it a shot. Love it or hate it, one thing is for sure: It sure as hell beats writing in Java.

![AboveAverageScript Logo](./AboveAverageScriptLogo.png)

<!--- 
Logo courtesy (in part) of https://averagechronicles.files.wordpress.com/2013/02/average-logo.png
-->

##Grammar
###Macrosyntax

```

    Program         ::= Stmt Block EOF
    Block           ::= (Newline Stmt)*
    Stmt            ::= DeclareStmt  
                     |  AssignStmt
                     |  NativeStmt
                     |  SwitchStmt
                     |  Loop
                     |  IfStmt
                     |  ConsumeStmt
                     |  ReturnStmt
                     |  ControlStmt
                     |  Exp

    DeclareStmt     ::= 'let' (ExpList '=' (ObjInd | ExpList)) | (SetEqual (',' Indent Newline SetEqual (',' Newline SetEqual)* Dedent ) )
    AssignStmt      ::= (ExpList AssignOp (ObjInd | ExpList)) | (SetAssign (',' Indent Newline SetAssign (',' Newline SetAssign)* Dedent ) )
    ConsumeStmt     ::= ExpList? '<-' Exp
    ReturnStmt      ::= 'ret' Exp?
    ControlStmt     ::= 'stop' | 'skip'
    SetAssign       ::= Exp AssignOp Exp
    SetEqual        ::= Exp '=' Exp

    IfStmt          ::= 'if' Exp ':' Indent Block Dedent (Newline 'elif' Exp ':' Indent Block Dedent)* (Newline 'else' Indent Block Dedent)?
    SwitchStmt      ::= 'switch' Exp ':' Indent Case+ Defaults? Dedent
    Case            ::= Newline 'case' Exp18 ':' Indent Block Dedent
    Defaults        ::= Newline 'default' ':' Indent Block Dedent
    NativeStmt      ::= '***native***'

    Loop            ::= WhileLoop | ForLoop
    WhileLoop       ::= DoWhile | While
    DoWhile         ::= 'do' Indent Block Dedent Newline 'while' Exp
    While           ::= 'while' Exp ':' Indent Block Dedent
    ForLoop         ::= (ForIn | ForColon | For) ':' Indent Block Dedent
    ForIn           ::= 'for' Id (',' Id)? 'in' Exp
    ForColon        ::= 'for' Id ':' Exp
    For             ::= 'for' ( ('let'? Id '=')? Exp ',')? Exp ',' Exp

    Exp             ::= Exp1 (ForIn | ForColon)*
    Exp1            ::= Exp2 ('if' Exp2 ('else' Exp2)?)?
    Exp2            ::= Exp3 ('in' Exp3)*
    Exp3            ::= Exp4 ('?' Exp4 ':' Exp4)?
    Exp4            ::= Exp5 ('or' Exp5)*
    Exp5            ::= Exp6 ('and' Exp6)*
    Exp6            ::= Exp7 ('|' Exp7)*
    Exp7            ::= Exp8 ('^' Exp8)*
    Exp8            ::= Exp9 ('&' Exp9)*
    Exp9            ::= Exp10 (EqualOp Exp10)*
    Exp10           ::= Exp11 (CompareOp Exp11)*
    Exp11           ::= Exp12 (ShiftOp Exp12)*
    Exp12           ::= Exp13 (AddOp Exp13)*
    Exp13           ::= Exp14 (MulOp Exp14)*
    Exp14           ::= PrefixOp? Exp15
    Exp15           ::= Exp16 PostfixOp?
    Exp16           ::= 'new'? Exp17 Call?
    Exp17           ::= Exp18 (ArrayCont | Call | '.' Exp17)*
    Exp18           ::= Id | BoolLit | IntLit | StringLit | '(' Exp Newline? ')' | Func | ArrayLit | ObjectInline | This | RegExpLit

    ArrayLit        ::= ('[' ']') | ArrayCont
    ArrayCont       ::= '[' (Exp (',' Exp)*) | (Indent Newline Exp (',' Newline? Exp)* Dedent Newline) Newline? ']'
    ExpList         ::= Exp (Newline? ',' Exp)*
    RegExpLit       ::= '\/[^\/\\]+(?:\\.[^\/\\]*)*\/[igm]{0,3}'
    Func            ::= 'func' (Id (',' Id)* )? '->' ('ret'? Exp) | (Indent Block Dedent)
    ObjectInline    ::= '{' (Property (',' Property)*) | (Indent Newline Property (',' Newline Property)* Dedent Newline) '}'
    ObjInd          ::= Indent (Newline (Prop|PropInd) )+ Dedent
    Prop            ::= (Id | BoolLit | StringLit) ':' Exp
    PropInd         ::= (Id | BoolLit | StringLit) ':' (Exp | ObjInd)
    Call            ::= '(' ( ExpList (Newline? ',' Indent Newline Exp (Newline ',' Exp)* Dedent)? Newline?)? ')'

```

###Microsyntax

```

    AssignOp        ::= '=' | '+=' |'-=' | '*=' | '/=' | '%=' | '<<=' | '>>=' | '>>>=' | '&=' | '^=' | '|='
    EqualOp         ::= '!==' | '===' | '!=' | '=='
    CompareOp       ::= '>=' | '>' | '<=' | '<'
    ShiftOp         ::= '>>>' | '>>' | '<<'
    AddOp           ::= '+' | '-'
    MulOp           ::= '%' | '/' | '*'
    PrefixOp        ::= '--' | '++' | '-' | '+' | '~' | 'not'
    PostfixOp       ::= '--' | '++'

    IntLit          ::= '[+-]?((0x[a-fA-F0-9]+)|(\d+(\.\d+)?([eE][+-]?\d+)?))'
    StringLit       ::= '\"[^\"\\]*(?:\\.[^\"\\]*)*\"|\'[^\'\\]*(?:\\.[^\'\\]*)*\''
    Id              ::= '[_$a-zA-Z][$\w]*(?=[^$\w]|$)'
    This            ::= '_'
    Newline         ::= '\n'
    Indent          ::= '\i'
    Dedent          ::= '\d'
    EOF             ::= '@EOF'

```

The Macrosyntax doesn't actually capture everything, in particular indents within expressions. The reason being that it isn't context free, and for good reason. If it were based on context, it would completely ruin precedence. So, indents and dedents follow a simple rule: indent before or after any operator, and dedent at the end of an expression. If you enter a parenthesized expression or enter a series of dot accessors, you're in a new expression until it stops. Long story short, just take a look at the examples. You'll see the pattern. It's hard to explain what perfect style means.

Here's some basic variable code:

```js

    let a = 70                                  var a = 70;
    a++                                         a++;
    let b, c = a/20                             _['$t0'] = a/20;
                                                var b = _['$t0'];
                                                var c = _['$t0'];
    a %= c                                      a %= c;
    b, c = a, b                                 _['$t0'] = a;
                                                _['$t1'] = b;
                                                b = _['$t0'];
                                                c = _['$t1'];
    let d = a/b,                                var d = a/b;
        e = b/c,                                var e = b/c;
        f = c/d                                 var f = c/d;
    a, b, c, d, e, f >>= 1                      _['$t0'] = 1;
                                                a >>= _['$t0'], b >>= _['$t0'], c >>= _['$t0'],
                                                d >>= _['$t0'], e >>= _['$t0'], f >>= _['$t0'];

```

_AboveAverageScript_ is still Javascript, and as such is object oriented.

```js

    let fib = func a, amt ->                                    var fib = function(a, amt) {
        amt = defaults(amt, 1)                                      amt = defaults(amt, 1);
        ret amt if a in '01' else fib(a - 1, amt * a)               if('01'.indexOf(a) >= 0) {
                                                                        return amt;
                                                                    else {
                                                                        return fib(a - 1, amt*a);
                                                                    }
                                                                }

    let z = fib(3)                                              var z = fib(30;)

    let Chicken =                                               var Chicken = {
        breed: 'Bantam'                                             breed: 'Bantam',
        gender: 'Male'                                              gender: 'Male',
        eggsLaid: 14                                                eggsLaid: 14,
        cry: func -> log('COCKADOODLEDOO!')                         cry: function() {
                                                                        log('COCKADOODLEDOO!');
                                                                    }

    let Circle = func props ->             // For the translation of the rest of this section, check
        _['x', 'y', 'radius'] = 0          // the wiki. It can get quite involved when explaining how
        _ <- props                         // the property consumption ('<-') operator works.
        _.setLocation = func point ->
            _ <- point

    let Ellipse = new Circle({x: 0, y: 0, radius: 5})
    Ellipse <- {stroke: 'dashed', color: 'rgb(100,200,50)'}

````

I'm sure you noticed the funny little operator above, not to mention the odd new syntax for property access. Well, that's part of the new design. In a nutshell, the property consumption operator will look for named properties on the outermost expression of the righthand side, and assign them with the same name to the left hand side as properties. If no named properties are found, then it will simply take ALL properties from the right hand side. Please note that means the right hand side MUST be an object. Now, as for the left hand side, you have a few options. You can put in a series of expressions, whom all of which will recieve the properties. However, if no expression is given, then it will actually assign those variables to the local scope. However, assigning to the local scope tends to be slower (because it prevents modern Javascript engines from optimizing that code fragment), so you're better off not using it too often or too rapidly. As this is a much more involved concept, especially the code it translates to, you can find far more information on the wiki.

Of course, there was that other thing. The property access that was treated as if it were an array. Well, that's actually the most accurate description I can give. It's just your average property access with square brackets, except that you can list multiple items. Oh, and in case it wasn't clear, _AboveAverageScript_ uses `_` to specify the containing object, opposed to using `this`.

Pressing on...

```js

    let term = 300,                                                     var term = 300;
        list = [3, 5, 7, 9],                                            var list = [3, 5, 7, 9];
        index = 0                                                       var index = 0;
    while term > 0:                                                     while(term > 0) {
        for(i, val in list):                                                for(var i = 0; i < list.length; i++) {
                                                                                var val = list[i];
            term -= val                                                         term -= val;
            index = i                                                           index = i;
            if term <= 0:                                                       if(term <= 0) {
                stop                                                                break;
                                                                                }
                                                                            }
                                                                        }

```

Conditionals look a tad different, however.

```js

    let x = int(input("Please enter a number"))                           var x = int( input("Please enter a number") );   // input function is user defined.
    if x > 0:                                                             if( x > 0 ) {
        log("Feeling positive?")                                              log("Feeling positive?");
    elif x === 0:                                                         } else if( x === 0 ) {
        log("Zero? Really?")                                                  log("Zero? Really?");
    else                                                                  } else {
        log("Don't be so negative")                                          log("Don't be so negative");
                                                                          }

```

Comments are casual.

```js

    let teascript = "Awesome"                                             var teascript = "Awesome";   // Variables should be declared with let.
    CoffeeScript = "Casual"                                               CoffeeScript = "Casual";     // Variables can be declared without let,
    $ = "$"                                                               $ = "$";                     // but its far less clear.
                            /* Multiline comments are also available! */

```

Moving on. We've all used JQuery at one time or another. Well, since _AboveAverageScript_ creates a few built-in functions, they need to be placed somewhere. When using JQuery, the `$(function() { })` often proves helpful for ensuring your webpage loads quickly. Should you want these built-ins to be placed within your JQuery function, simply say `***native***`, and the compiler will know to place the built-ins there. Otherwise, they will just go to the top of your script.

```js

    $(func ->
        ***native***
        log("Now you can use these built-ins in your code without slowing down your webpage!")
    )

```

Here are the current (more pythonic) built-ins:

```js

    type(x)         // A replacement for typeof, function-ified.
    defaults(a, b)  // A function that helps make default parameters. If a is defined, then it returns a. Otherwise, b is returned.
    int(x, base)    // A function that is a wrapper for the much more verbose parseInt function
    float(x)        // A function that is a wrapper for the much more verbose parseFloat function
    is(x, y)        // A replacement for instanceof, function-ified, translating into 'x instanceof y'
    log(x)          // A wrapper for console.log
    error(x)        // A wrapper for console.error
    del(x, y)       // A replacement for delete, function-ified, translating into 'delete y[x]'
    len(obj)        // Quite literally a method call instead of saying '.length'
    size(obj)       // Returns the number of keys the object has.
    range(x, y, z)  // It works exactly the same way it does in Python. To save space, I'll defer you to their documentation.
    isUndef(val)    // Returns true if val is undefined. Its like isNaN for undefined.
    abs(x)          // A wrapper for Math.abs
    pow(x, y)       // A wrapper for Math.pow
    lazy(x, *)      // Returns a function that calls x with all of the remaining arguments when called.
    lazier(x, args) // Returns a function that calls x with the all of the arguments in the array args when called.

```

Just to make sure everything has been listed, here are all of the available loops.

```js

    let y = ["true", "false", true, 0, 9, {}]

    // for val in -> iterates over property values of object
    log(x) for x in y   // prints: "true", "false", true, 0, 9, {}

    // for key, val in -> iterates over property values of object
    log(a, b) for a, b in y   // prints: 0 "true", 1 "false", 2 true, 3 0, 4 9, 5 {}

    // for key:  -> iterates over key-value pairs?
    log(x) for x : y   // prints: 0, 1, 2, 3, 4, 5

```

Minor notes:
* Camel Casing is preferred  
* Spacing norm is 4 spaces (NOT TABS)  
* Expect the (_ever so slightly_) above average
* Not sure if you should use a semicolon? Don't use it. Ever. **Ever.** They have been banned.
