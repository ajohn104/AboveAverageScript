/*

let numbers = [11, 22, 33, 44, 55, 66, 77, 88, 99]
numbers[i for i in range(len(numbers))] += numbers[j for j in range(len(numbers), 0, -1)]
// vs
numbers[i for i in range(len(numbers))] += numbers[len(numbers)-i-1]

*/




/*

ex:

let numbers = [0, 1, 2, 3, 4],
    i = 0
numbers[i++] = numbers[i++] + 10

--> This should result in numbers => [11, 1, 2, 3, 4]
    -This is because the left side is evaluated first, followed by the right side.
    -- So, it's equivalent to numbers[0] = numbers[1] + 10, where i == 2 by the end of evaluation, but doesn't affect anything.

*/


/*

Ok, so I have an idea for an example to shed some light on how things should/need to work.

let numbers = [10,20,30,40,50]
numbers[i for i in range(len(numbers))] += numbers[j if j > i for j in range(len(numbers))]

Alright. What we have here is, at first glance, an expression that will iterate over each element in numbers, and add to it all numbers in 
that same list with a higher index than it. So, for each iteration, we would have:

0: numbers[0] += numbers[1..4]
1: numbers[1] += numbers[2..4]
2: numbers[2] += numbers[3..4]
3: numbers[3] += numbers[4]
4: numbers[4]

This would present the idea that the loop including j is evaluated within the loop for i. However, as seen in previous examples (not included 
here), we must store the values of the left side before anything is evaluated. So perhaps, we shouldn't be storing the values of the left side,
but rather any values or objects before they are used. This way, anything that should affect the original can just reference the original, and
anything that is within a macro will use that pre-stored value instead (Note: I need to look into this concept of what should be stored more at
a later date). However, I'd like to present a nearly identical example, that really hits a major issue on the head.

let numbers = [10,20,30,40,50]
numbers[i for i in range(len(numbers))] += numbers[j if j < i for j in range(len(numbers))]


This example only differs in one way. Rather than looking for indices greater than the current, it looks for indices less than the current. Which,
might not seem like a major change, but lets really consider the consequences. Because it's looking for indices less than the current, it is
looking at elements in numbers that have already been assigned to. So the question is, would it make more sense to stick with the current plan,
that is to say it stores values before-hand and then uses the stored values, or should it instead use values real-time. Well, I'm definitely going
with the former, but its still a good question. Mostly because it begs the question what someone else might expect. I'm aiming to produce minimal
surprises here. Anyways, here's the play-by-play for this example, assuming we use the pre-stored values option (Note: I have an idea for this.
What if exp17 simply creates a store for all of the pre-stored values as well as keeps track of the original, then decides which to use based off
of the type of accessor provides, be it a call, dot access, or bracket access. This doesn't solve everything, though. And honestly, I think I'm
looking at it all wrong)










x, y = y, x


a, b, c, d = b, a, d, c


let numbers = [10,20,30,40,50]

numbers[i for i in range(len(numbers))] += numbers[j if j > i for j in range(len(numbers))]

numbers[i for i in range(len(numbers))] += numbers[j if j < i for j in range(len(numbers))]

numbers[i] for i in range(len(numbers)) += numbers[j] if j < i for j in range(len(numbers))



numbers[i for i in range(len(numbers))] += numbers[j] if j < i for j in range(len(numbers))

numbers[i] for i in range(len(numbers)) += numbers[j if j < i for j in range(len(numbers))]



let numCopy = numbers[0..4]
for i: numCopy:
    let numCopy2 = numbers[0..4]
    for j: numCopy2:
        numCopy += 


numbers[0, 1, 2, 3, 4] = numbers[4, 3, 2, 1, 0]



for i : numbers:
    let numCopyI = numbers[i]
    let numCopy = numbers[copy]
    numbers[i] += numCopy[i+1..len(numbers)-1]








OOOOk. Well. Lets take a stand. As a base for standing on, lets present our two control examples, then create a few rules from them.

1)


let numbers = [10, 20, 30, 40, 50]
numbers[i for i in range(len(numbers))] = numbers[len(numbers)-i-1]


The above should simply reverse the array numbers. I need to expand these as macros to make what is happening more clear.


let numbers = [10, 20, 30, 40, 50]
numbers[i for i in range(len(numbers))] += numbers[j if j < i for j in range(len(numbers))]


The above should 



Alright... lets just establish a rule of thumb. Whenever an expression begins, it gets a "snapshot" of all values involved. Sort of.

So lets say we had one of the above examples, 

numbers[i for i in range(len(numbers))] += numbers[j if j < i for j in range(len(numbers))]


Translating it step-by-step, we have:

1)     numbers[i for i in range(len(numbers))] += numbers[j if j < i for j in range(len(numbers))]

2)     numbers[0, 1, 2, 3, 4] += numbers[j if j < i for j in range(len(numbers))]

3)     numbers[0, 1, 2, 3, 4] += numbers[], numbers[0], numbers[0, 1], numbers[0,1,2], numbers[0,1,2,3]

4)     numbers[0], numbers[1], numbers[2], numbers[3], numbers[4] += numbers[], numbers[0], numbers[0, 1], numbers[0,1,2], numbers[0,1,2,3]


So in the end, it'll be using only stored values for the right side


*/






/*    -- Current Strategy for value storage/swapping --

Alright, new strategy. All expressions keep a dictionary of sorts of any variables that might be referenced, and the correct reference to use 
when working with each of those variables. Then, whenever the expression descends into a deeper one, it passes that map in, so that the deeper
one can make a copy and make changes to its copy if necessary. This provides a base for the correct use of expressions with unpacking. In an
expression, if a bracket access is used, then that bracket access will look up the current reference to use for the requested source, and then
make a complete copy of it. Then that copy becomes the new reference for the requested source within that property access (or, on the other side
of a declaration/assignment/consumption statement). This means that it will replace the previous requested source within the hashmap that the
bracket access has (but not anything above it). In this way, for loop expressions that exist outside of the bracket access aren't affected by
the copy that the bracket access made.

*/


/*

let list = [10, 20, 30, 40, 50]

Now for some assignment stmts that demonstrate everything.

list[i] for i in range(len(list)) += i

list[i for i in range(len(list))] += i

list[i for i in range(len(list))] += j for j in range(len(list))

list[i for i in range(len(list))] += list[j] for j in range(len(list))

list[i for i in range(len(list))] += list[j for j in range(len(list))]

list[i for in in range(len(list))] += list[(j + k)%len(list) for j in range(len(list)) for k in range(len(list))]

list[i for i in range(len(list))] += list[j] + lisk[k] for j in range(len(list)) for k in range(len(list))

list[i for i in in range(len(list))] += j + k for j in list for k in list

sum = [i for i in list].reduce(func x, y -> ret x + y)

// Still more to come...

*/


/*

...I lied. Nothing more to come in the above, because it occurred to me I completely forgot how I originally saw all of this. Now, that's
not to say that my newer vision is wrong, but it would be harder to code and even harder to explain. Well, fully and perfectly explain, that is.
Not to mention it causes some serious issues with precedence. Anyways, now that I'm a bit more clear about how things work, I'm gonna cause
problems again. But first, lets say it nice and clear. The bracket notation is only a macro. Meaning if you want to reverse a list, you need
a macro on both sides, with a separate for loop on each side. The values they use aren't visible on both sides. So really, you could use
the same id 'i' on both sides without issue. Probably. Depends how you use it, really. In regards to that, here's some potential problems and/or
unexplained expressions/statements.


let list = [10, 20, 30, 40, 50]

list[i for i : list] += list[j] for j in list
// Quick aside. If I wanted to, say, require that it only be elements of list (>j) how would I do that? I wouldn't. Not with this setup.
// So that's problem #1.
// Solution: allow for-loops to have statements? Or, allow statements to be wrapped in parens to separate them so they can be used like exp?
// No, I can't. That would create... problems, with the way that I have to compile statements into places where only exp are allowed. So I
// suppose I'll leave this as a maybe. Still a problem though.

list[i] for i : list += list[j] for j in list
// What does this even mean? I'm starting to think that the left side variables really should be visible. But that still wouldn't fit the
// original vision. But anyways, back to work.
// To be honest, the newer vision makes more sense as well as less sense. Which is... annoying. They (the old and new way) can probably
// find common ground if I give it some time and thought. But not having the left side provide its values to the right side makes for a
// very limited feature. Alth-- never mind. Yeah, so this does cause what I consider to be a fatal flaw. The newer way is far more preferable.
// However, it also makes it less of a macro and more a script. That isn't to say it can't be done in a single line, but I can't say I really
// like the replacement. In a single line, it would be -- wait, never mind. The macrosyntax doesn't support that. All loops require an
// indented block. Even if its a single line. So... I'm leaning toward the newer way, but god damn I prefer the old way in terms of simplicity.
// Even still, the newer way has a firm grasp on usability.


list[i for i : list] += [ [k if j > k for k : list] for j : list].reduce(func x, y -> ret x + y)
// Ok, so this is how you would do the thing I talked about earlier. In far more characters than it should take. :/

// More to come...in theory...

*/


/*









*/