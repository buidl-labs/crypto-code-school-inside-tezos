> Assertion statements are also a kind of condition checking statements but they are very useful in smart contracts because unlike if/else statements, they revert back the transaction and hence saving the gas as well.

> SmartPy has one assertion statement, 

```python
sp.verify(condition, message="")
# message is an optional parameter
``` 

> This is used at the beginning of any entry_point to check the required conditions. 

> In your example, previously, if/else statements were used. That is not an efficient way of doing things as you may have noticed, if the condition is not met and the code goes to else statement, it has nothing to execute and the gas will be wasted. 

> To overcome this, you will be using `sp.verify()` statement.

Tasks:

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