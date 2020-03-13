> `sp.sender` is a global variable that is availble to all function. It is of type `sp.TAddress` and it refers to the address of the user who is calling the function.

Example:

```python
@sp.entry_point
def makeOwner():
    isOwner[sp.sender] = True
# if `tz1234` calls this function, then he will become the owner.    
```

Task:

1) remove `params.sender` from `assignChar` function.

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