# Game overview
**A card game built on tezos smart contract, with zombies and plants as its player.**
 1. User will choose b/w plant or zombie as there character
 2. After that, user will go through a journey and build its selected player
 3. For every successful completion of a chapter user will earn x points, which the user will be allowed to spend to upgrade their player at the end of the lesson
 4. For checking the answer or hint user will incur in subtraction of points
 5. At the end of the lesson, user can/will fight with a NPC(NON-PLAYABLE-CHARACTER) boss, which will depict whether user has completed the lesson without skiping the chapters and directly checking the hint and answer to progress forward(need to be finalized).
 
## Features to be considered
 - Allow user to compete with other players after lesson completion, online.
 - User will compete with same level online, If the user win against another online player there point will be deducted and added to the user who won the game thus allowing to level_up even more

## Lesson development path
 - Lesson 1: creation of basic simple contract(Building player character from sratch)
 - Lesson 2: Player character evolution(Add extra feature like special power etc) 

## Gamification Thought Process
If we think of popular game like pubg, the game itself has around only 3 maps but the element of multi-player game aspect provides a dopamine rush every time the game is played since every time the experience is different, that’s the crux which will be used to build the foundation of the game.

### Principles to be followed
 - Remove monotony nature that tends to kick in games normally
 - Every path user take is a unique one — you’re on your own personal (learning) journey.

# Lesson Index
 1. Intro
 2. Lesson Overview
 3. Scaffolding A Contract
 4. State Variables
 5. Integers
 6. Creating A Entry Point Function
 7. Math Operations
 8. Lists(needs to be linked to the game story)
 9. Booleans(needs to be linked to the game story)
 10. Mapping(needs to be linked to the game story)
 11. if/else(TODO: add)
 12. throw/assert(TODO: add)
 13. structs(TODO: add)

## Lesson Content

### 1.Intro
This lesson will teach you how to build a card game on tezos. It's designed for beginners, but it assumes you have some experience programming in python language.	
SmartPy is a high-level smart contract library in Python that offers a simple, intuitive and powerful syntax, enabling developers to easily define Michelson smart contracts for the Tezos blockchain.

### 2.Lesson Overview
In Lesson 1, you're going to build your selected player for bidding againt a npc boss at the end of lesson.

You will choose b/w plant or zombie as your character, After that, you will go through a journey and build your selected charachter, For every successful completion of a chapter you will earn x points, which can be spent to upgrade your player at the end of the lesson.For checking the answer or hint will incur in subtraction of points, At the end of the lesson you will fight with a NPC(NON-PLAYABLE-CHARACTER) boss, with the character you have built on your own.

Select your character
You can choose between zombie or a plant as your player
**Select your player, you would like to go forward with**

### 3.Scaffolding A Contract
Starting with the absolute basics:

You'll learn how to interact with the smartpy, a python library using in-browser editor. This perfectly simulates how you can interact with a REAL tezos testnet today. Later, we'll show you how to deploy it to a testnet.

Smart contracts are small programs that are stored and executed on the blockchain, smart contracts in Tezos are unique, as they’re written in Michelson. In addition, Tezos supports formal verification, which guarantees the correctness of smart contract code with respect to a specification. Smart contract code can be proved mathematically according to certain properties. Using formal verification, the Tezos project makes smart contracts more secure and reliable.
 — all variables and functions belong to a contract, and this will be the starting point of all your projects.

We define a Python class lets call it `Character` that inherits from the `Contract` class of SmartPy. This class will represent our smart contract and enclose all of the storage initialization, entry points.


First of all, we’ll have to import the smartpy library
```python 
import smartpy as sp	
```

An empty contract named HelloWorld would look like this:
```
class HelloWorld(sp.Contract) {

}
```

**Put it to the code**
All smartpy source code should start by importing `smartpy` library
It looks like this: 
```python
import smartpy as sp
```
Putting it together, here is a bare-bones starting contract — the first thing you'll write every time you start a new project:
```python
class Character(sp.Contract) {

}
```

### 4.State Variables
Great job! Now that we've got a shell for our contract, let's learn about how smartpy deals with variables.

We define an initialization method for HelloWorld  that determines the initial storage during contract origination. `__init__()` accepts one argument, name and calls `self.init()` to assign its value to the newly-created name varaible field of type string in the contract’s storage.

```python
def __init__(self, name):
    self.init(name = sp.string(name))
```

This contract calls an initialization method `self.init`, contained in `sp.Contract`, that is able to determine an initial storage for the contract.

**Put it to code**
(Continuing from previous state)
```python
import smartpy as sp
class Character(sp.Contract) {
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

**Put it to code**
Now you'll intialize attack and defence for your player
add attack and defence state variable to your storage with x values respectively

(Continuing from previous state)
```python
import smartpy as sp
class Character(sp.Contract) {
    def __init__(self, name):
        self.init(name = sp.string(name), attack=sp.int(10), defence=sp.int(10))
}
```


### 6.Creating A Entry Point Function
Entry Point is a method of a contract class that can be called from the outside. They need to be marked with the `@sp.entry_point` decorator. For example the following entry point checks that the argument given is greater than 2.

```python
@sp.entry_point
def checkName(self, params):
   sp.verify(params.x > 2)
```
**Put it to code**
Now let's create attack and defence entry point function for your character
TODO: create point machanics
```python
import smartpy as sp
class Character(sp.Contract) {
    def __init__(self, name):
        self.init(name = sp.string(name), attack=sp.int(10), defence=sp.int(10), life=sp.int(100)
    
    @sp.entry_point    
    def attack(self):
        sp.verfiy(self.data.life > 0 )
        //TODO: return attack
        return self.data.attack
        
    @sp.entry_point    
    def defence(self):
        sp.verfiy(self.data.life > 0 )
        //TODO: return defence(which will be reduced from attack point from subtracting life point )
        return self.data.defence
}
```

### 7.Math Operations
The arithmetic operators +, -, *, %, // behave just like in Python.

In SmartPy, type inference of arithmetic operators imposes that both sides have the same type.

**Put it to do**
TODO: attack/defence mechanics to be added using basic math operations

### 8.Lists
There is no array in SmartPy because they are missing in Michelson, instead we have list.
Container constructor names are uncapitalized `([1, 2, 3])` and their types are capitalized: `(sp.TList)`
sp.TList: The type of lists, e.g. [1, 2, 3].
sp.list(l = …, t = …): Defines a list of (optional) elements in l whose optional type is t
Example: `sp.list(l=[1, 2, 3], t=sp.TInt)`

**Put it to code**
TODO: example to be added here

### 9.booleans
SmartPy has `sp.TBool`: The type of boolean values, True, False, sp.bool(True) and sp.bool(False)

**Put it to code**
TODO: example to be added here

### 10.mapping
Maps are data structures that store key-value pairs. As a result, they enable smart contracts to create valuable associations between related information.

sp.TMap:  e.g. {'A': 65, 'B': 66, 'C'; 67}.
sp.TBigMap: e.g. {'A': 65, 'B': 66, 'C'; 67}.

sp.big_map(l = …, tkey = …, tvalue = …): Defines a big_map of (optional) elements in l with optional key type tkey and optional value type tvalue.
sp.map(l = …, tkey = …, tvalue = …): Defines a map of (optional) elements in l with optional key type tkey and optional value type tvalue.
Example: sp.map(l={one: 1, two: 2}, tkey=sp.TString, tvalue=sp.TInt)
Container constructor names are uncapitalized `{'A': 1, 'B': 2, 'C': 3}` and their types are capitalized: `(sp.TMap) or (sp.TBigMap)`
There is no array in SmartPy because they are missing in Michelson, we use maps instead.

**Put it to code**
TODO: example to be added here



### 11.if/else
Since Python doesn’t allow its control statements to be overloaded, certain language constructs are desugared by a pre-processor: `sp.if, sp.else` are SmartPy commands.
If we use e.g. sp.if instead of a plain if, the result will be a SmartPy conditional instead of a Python one. SmartPy conditionals are executed once the contract has been constructed and has been deployed or is being simulated. On the other hand, Python conditionals are executed immediately. Therefore the condition after the if cannot depend on the state of the contract. When in doubt, always use the sp. prefix inside a smart contract.

**Put it to code**
TODO: example to be added here


### 12.throw/assert
TODO: add content

### 13.structs
Python by default doesn't have struct in-built, so in that case we can create our own
```python
class Struct(object):
    pass
s = Struct()
s.whatever = 'you want'
 ```
 
 
 # Game Mechanics
 
 #### Type of Characters
 1. For Plants
    a. Pea shooter
 
 ### Point System
 > Every Character will have
    0.A Name
    1.Evolution state: basic / level1 / level2
    2.HP(Hit Points):
    3.Type(plant/zombie)
    4.attacks: how much damage they can do
    5.weakness
    
For very chapter user will earn 5 points 

 ### Fight system(player vs player and player vs npc)
 >
 ### Interaction
 >
 
 # Application Principles
 - Mobile first design principle
 - SEO/SSR
    - Research needed(come to a conclusion as to what aspect of it is needed to be considered, estimated time for research: 5hrs)
 - Decide Which framework would be best on for frontend side
    - Gatsby(with markdown for content)

