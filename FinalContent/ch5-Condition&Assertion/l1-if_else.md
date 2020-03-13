> If/else statements are the conditional statements which are used to check condition and run the chunk of code only if the conditions are met. 

> In smartpy, if/else statements are declated as:

```python
sp.if [condition]:
    # chunk of code if condition is met

sp.else:
    # chunk of code if condition is not emt
```

> You will use these condition statements to check if the sender address is already assigned with a character or not. This will ensure that one user has only one character

Tasks : 
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