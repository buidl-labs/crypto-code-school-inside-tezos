# Game overview
A zombie apocalypse has begun. You’ve luckily found the seed of a plant that is known to stop zombies. Your task is to incubate the seed and help it evolve before the zombies reach you. In the lesson, you’re going to learn how to evolve your plant and train it to defend against the incoming apocalypse.

The seed evolves to a plant as the user progresses through the chapters. Completing the lesson results in the user playing an (optional, small) interactive game where the plant defeats the zombies (this is synonymous to a google doodle with infinite attempts and the user will most likely win this easy game).

 - No currency/points as it distracts from the lesson. A direct reward is received after completing the chapter.
 - Scope to add potions/accessories received after completing a chapter

# Lesson Index
 1. **Intro**(smartpy intro)
 2. **Lesson Overview**(storyline intro)
 3. **Scaffolding A Contract**(smart contract intro + creating shell for contract)
 4. **State Variables**(using self.init() method for storing contract state)
 5. **Integers**(int, nat, and intOrNat explanation)
 6. **Booleans**
 6. **Creating A Entry Point Function**(public method of a contract class)
 7. **Math Operations**(+, -, *, %, operations)
 8. **Pairs**(unique datatype which is a pair of 2 values)
 10. **Records**(act as structs)
 11. **Maps**(key-value pairs)
 12. **Address**(is address of the user who is calling the function)
 13. **List**(collection of values which are of same type)
 14. **If/Else**
 15. **Verify**(Assertion command)

## Lesson Content

### 1.Intro
This lesson will teach you how to build a simple smart contract in smartpy which can be deployed on tezos blockchain. It's designed for beginners, but it assumes you have some experience programming in python language.

SmartPy is a high-level smart contract library in Python that offers a simple, intuitive and powerful syntax, enabling developers to easily define Michelson smart contracts for the Tezos blockchain.

First of all, we’ll have to import the smartpy library
```python 
import smartpy as sp	
```

**Put it to code**
All smartpy source code should start by importing `smartpy` library
It looks like this: 
```python
import smartpy as sp
```

### 2.Lesson Overview
In Lesson 1, you're going to incubate your plant to fight against zombie apocalypse at end of the lesson.

A zombie apocalypse has begun. You’ve luckily found the seed of a plant that is known to stop zombies. Your task is to incubate the seed and help it evolve before the zombies reach you. In the lesson, you’re going to learn how to evolve your plant and train it to defend against the incoming apocalypse.

Incubating users plant
`*(Animation of seed being set in an incubator)*`
 
### 3.Scaffolding A Contract
Starting with the absolute basics:

You'll learn how to interact with the smartpy, a python library using in-browser editor. This perfectly simulates how you can interact with a REAL tezos testnet today. In Later lessons, we'll show you how to deploy it to a testnet.

Smart contracts are small programs that are stored and executed on the blockchain, smart contracts in Tezos are unique, as they’re written in Michelson. In addition, Tezos supports formal verification, which guarantees the correctness of smart contract code with respect to a specification. Smart contract code can be proved mathematically according to certain properties. Using formal verification, the Tezos project makes smart contracts more secure and reliable.
 — all variables and functions belong to a contract, and this will be the starting point of all your projects.

We define a Python class lets call it `HelloWorld` that inherits from the `Contract` class of SmartPy. This class will represent our smart contract and enclose all of the storage initialization, entry points.

An empty contract named HelloWorld would look like this:
```
class HelloWorld(sp.Contract) {

}
```

**Put it to the code**(Continue from the previous state)
Putting it together, here is a bare-bones starting contract — the first thing you'll write every time you create a new contract:
Declare a class named Plant and extend smartpy contract class from it
```python
class Plant(sp.Contract) {

}
```

### 4.State Variables
Great job! Now that we've got a shell for our contract, let's learn about how smartpy deals with variables.

We define an initialization method for `Plant` that determines the initial storage during contract origination. `__init__()` accepts one argument, name and calls `self.init()` to assign its value to the newly-created name variable field of type string in the contract’s storage.

SmartyPy does most of type inference automatically in almost all the cases, we can also explicitly define string by using sp.string method

Container constructor names are uncapitalized `(sp.string("peashooter"))` and their types are capitalized: `(sp.TString)`

```python
def __init__(self, name):
    self.init(name = sp.string(name))
```

This contract calls an initialization method `self.init`, contained in `sp.Contract`, that is able to determine an initial storage for the contract and all the state variables are declared in self.init method.

**Put it to code**(Continuing from previous state)
Now, declare  `__init__` function inside the plant class
```python
    def __init__(self, name):
        self.init(name = sp.string(name))
}
```

### 5.Integers
Container constructor names are uncapitalized `(sp.int(-42))` and their types are capitalized: `(sp.TInt)`

 - sp.TInt: The type of integer values, e.g. -42 or sp.int(-42).
 - sp.TNat: The type of non-negative integer values, e.g. sp.nat(42).
 - sp.TIntOrNat: The type of integer values whose type is still undetermined between sp.TInt or sp.TNat, e.g. 42 or sp.intOrNat(42).

In SmartPy, we have three possible types for integer: `int, nat, and intOrNat`. When writing an integer 12, we don’t know whether it is an int or a nat so we type it as intOrNat. Its exact type will be determined at a later stage. This determination is necessary for the Michelson compiler because Michelson needs to make this precise determination.

**Put it to code**(Continuing from previous state)
Now you'll intialize growth_rate attribute and health for your plant to grow.
declare growth_rate state and health variable to your storage with 10, 100 value respectively

```python
    def __init__(self, name, growth_rate):
        self.init(name = sp.string(name), growth_rate = sp.int(10), health = sp.int(100))
```

### 6.booleans
SmartPy has `sp.TBool`: The type of boolean values, True, False, sp.bool(True) and sp.bool(False)

In smartPy, all the bitwise operators work the same way as in python, so for example, `True == ~False` is correct in smartPy as well.

**Put it to code**
Your Plant is alive as its health is 100, declare boolean attribute `is_alive` with the initial value as `False`

`self.init(is_alive = False)`

`*Animation: Plant starts growing*`

### 7.Creating A Entry Point Function
Entry Point is a method of a contract class that can be called from the outside. They need to be marked with the `@sp.entry_point` decorator. For example the following entry point checks that the argument given is greater than 2 or not.

```python
@sp.entry_point
def checkName(self, params):
   sp.verify(params.x > 2)
```
**Put it to code**(Continuing from previous state)
Now let's create shell for attack and defence entry point function for your plant.
Declare function `attack` and `defence` with `entrypoint` decorator.
```python
@sp.entry_point
def attack():
    pass

@sp.entry_point
def defense():
    pass
```
`*Animation: Evolution/Growth*`

### 8.Math Operations
The arithmetic operators +, -, *, %, // behave just like in Python.

In SmartPy, type inference of arithmetic operators imposes that both sides have the same type.

> For example, If zombie attack your plant, the plant's health will decrease.
`self.data.health -= params.attack`

**Put it to do**(Continuing from previous state)
Complete the attack and defence functions and upgrade attack and defence of your plant.

```python
(Need discussion)
@sp.entry_point
def attack(self, params):
    self.data.attack += params.attack

@sp.entry_point
def defense(self, params):
    self.data.defense += params.defense
```
`*Animation: Plant becomes a pea shooter*`


### 8.Pairs
`Pair` is a unique datatype in smartPy which is nothing but a pair of 2 values. These values can be of any primitive datatype and need not be the same.

To initialize a pair:
```python
example = sp.pair("", 0)
# this will initialize a pair with first element as sp.TString and second as sp.TInt
```
Elements of a pair can be called by using `sp.fst(..)` to get the first element and `sp.snd(..)` to get the second element.

Example:

```python
sp.fst(example) # this will give you the first value of test
sp.snd(example) # this will give you the second value of test
```

Elements of a `pair` is immutable, that means, you cannot reassign values to it's unique elements.

Example:
```python
sp.fst(test) = "change"
# this will give you error
```

**Put it to do**(Continuing from previous state)
Declare and initialize a variable of type `sp.TPair(sp.TString, sp.TInt)` `power_move`

```python
self.init(power_move = sp.pair("Bullet Seed", 95))
```
`*Animation: Plant Evolves*`
### 9.Record(Structs)
Python doesn't have concepts of structures, so to compensate for the same, smartPy has Records which act as structs. This not only makes the contract more readable and understnadable but also makes it much more logical.

Records in smartPy contract are declared in the following manner `Record = sp.record()`

**Put it to do**(Continuing from previous state)
1) Remove the various Plant attributes which were initialized earlier and also `attack` and `defense` functions as these functions will need to be updated.

2) Create a variable named `stat` which is a record containing the values of all the attributes of your Plant
```python
self.init(stat = sp.record(
name = name,
attack = sp.int(70),
defence = sp.int(30),
health = sp.int(100),
growth_rate = sp.int(10),
is_alive = False)
```

### 10.Maps
Maps are data structures that store key-value pairs. As a result, they enable smart contracts to create valuable associations between related information.

Maps in smartPy can be declared in the following manner:
`sp.TMap:  e.g. {'A': 65, 'B': 66, 'C'; 67}`
`sp.TBigMap: e.g. {'A': 65, 'B': 66, 'C'; 67}`

sp.big_map(l = …, tkey = …, tvalue = …): Defines a big_map of (optional) elements in l with optional key type tkey and optional value type tvalue.
sp.map(l = …, tkey = …, tvalue = …): Defines a map of (optional) elements in l with optional key type tkey and optional value type tvalue.
`Example: sp.map(l={one: 1, two: 2}, tkey=sp.TString, tvalue=sp.TInt)`
Container constructor names are uncapitalized `{'A': 1, 'B': 2, 'C': 3}` and their types are capitalized: `(sp.TMap) or (sp.TBigMap)`

SmartPy has an inbuilt function `map.contains(key)` to check if a certain key is already available in the mapping or not. If the key is present, then it will return `True`, otherwise `False`.

Mapping will be used to point your tezos wallet address with your character.

**Put it to code**(Continuing from previous state)
1) Declare a variable `player` of type mapping and initialize it as an empty map

`player = sp.map() # edit in self.init`

2) Create an entry_point `assignPlant` which will take one string parameter `name` which will be name of your plant.

```python
    @sp.entry_point
    def assignChararter(self, params):
        self.data.player[params.sender] = self.data.stat
        self.data.player[params.sender].name = params.name
```


### 9.Address
`sp.sender` is a global variable that is availble to all function. It is of type `sp.TAddress` and it refers to the address of the user who is calling the function.

Example:
```python
@sp.entry_point
def makeOwner():
    isOwner[sp.sender] = True
# if `tz1234` calls this function, then he will become the owner.    
```

**Put it to code**(Continuing from previous state)
1) remove `params.sender` from `assignCharacter` function.

2) use `sp.sender` to assign character to the function caller.

3) Also update the previously defined `attack` & `defense` functions in the same manner.

```python

    @sp.entry_point
    def attack(self, params):
        self.data.player[sp.sender].attack += params.attack

    @sp.entry_point
    def defence(self, params):
        self.data.player[sp.sender].defence += params.defence
        
```

### 8.List
Lists are the collection of object/values which are of same type.
List in smartPy are of type sp.TList but are initialized in the same manner as in python.
There is no array in SmartPy because they are missing in Michelson, we use maps instead.
example:
`list = []`
Values can be added to the list by using `push` function

Example:
`list.push(value)`
In your contract, list will be used to store all the attacks of your plant which will create a special move.

**Put it to code**(Continuing from previous state)
1) Remove `power_move` as it is not required now.

1) declare an empty list `special_move` inside the stat record

`special_moves = []`

2) Create a function `createMove` which will take a list of `sp.TPair` type `moves` as parameter and will store that list in `special_moves`.


```python
    @sp.entry_point
    def createMove(self, params):
        self.data.player[sp.sender].special_move = params.moves
```

### 11.if/else
If/else statements are the conditional statements which are used to check condition and run the chunk of code only if the conditions are met. 

In smartpy, if/else comamands are `sp.if, sp.else`.

```python
sp.if [condition]:
    # execute code if condition met

sp.else:
    # execute code if condition didn't met
```

You will use these condition statements to check if the sender address is already assigned with a character or not. This will ensure that one user has only one character

**Put it to code**(Continuing from previous state)
Check if the sender is already assigned

```python
    @sp.entry_point
    def assignChar(self, params):
        sp.if ~ self.data.player.contains(sp.sender):
            self.data.player[sp.sender] = self.data.Character
            self.data.player[sp.sender].name = params.name
        sp.else:
            pass
```



### 12.Verify
Assertion statements are also a kind of condition checking statements but they are very useful in smart contracts because unlike if/else statements, they revert back the transaction and hence saving the gas/transaction fees as well.

Assertion command can be as follows in SmartPy: 
```python
sp.verify(condition, message="")
# message is an optional parameter
``` 

We can use verify command at the beginning of any entry_point to check the required conditions. 

In our example previously, if/else commands were used. That is not an efficient way of doing things as you may have noticed, if the condition is not met and the code goes to else statement, it has nothing to execute and the gas/transaction fee will be wasted. 

To overcome this, you will be using `sp.verify()` statement.

**Put it to code**(Continuing from previous state)
1) Remove if/else statment from the previous code.
2) Include `sp.verify()` statement to check the conditions.

```python
    @sp.entry_point
    def assignChar(self, params):
        sp.verify(~ self.data.player.contains(sp.sender), "User already have a character")
        self.data.player[sp.sender] = self.data.Character
        self.data.player[sp.sender].name = params.name
```

3) Create a function `endGame` that will verify the health of the player. If health of the player is 0, change `is_alive` to `False` and end the game.

```python
    @sp.entry_point
    def endGame(self, params):
        sp.verify(self.data.player[sp.sender].health == 0, "You are not dead")
        self.data.player[sp.sender].is_alive = False
```
 
 ##Final Code
 ```Python
 import smartpy as sp

class Plant(sp.Contact):

    def __init__(self, _name):
        self.init(player = sp.map(), stat = sp.record(name = _name, attack = sp.int(0), defence = sp.int(0), health = sp.int(100), growth_rate = sp.int(5), is_alive = True, special_move = []))


    @sp.entry_point
    def assignChar(self, params):
        sp.verify(~ self.data.player.contains(sp.sender), "User already have a character")
        self.data.player[sp.sender] = self.data.stat
        self.data.player[sp.sender].name = params.name

    @sp.entry_point
    def attack(self, params):
        self.data.player[sp.sender].attack += params.attack

    @sp.entry_point
    def defence(self, params):
        self.data.player[sp.sender].defence += params.defence

    @sp.entry_point
    def endGame(self, params):
        sp.verify(self.data.player[sp.sender].health == 0, "You are not dead")
        self.data.player[sp.sender].is_alive = False
```
 
 # Game Mechanics
 TODO:
 
 # Techstask
 - Gastby
    - mdx(markdown support)
 - Monaco editor
 - Typescript
 - Emotion library