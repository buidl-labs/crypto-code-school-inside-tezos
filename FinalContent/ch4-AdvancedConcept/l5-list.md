> Lists are the collection of object/values which are of same type.

> List in smartPy are of type sp.TList but are initialized in the same manner as in python.

example:
`list = []`

> values can be added to the list by using `push` function

example:
`list.push(value)`

> In your contract, list will be used to store all the attacks of your plant which will create a special move.

Tasks:

1) Remove `power_move` as it is not required. 

1) declare an empty list `special_move` inside the stat record

`special_move = []`

2) Create a function `createMove` which will take a list of `sp.TPair` type `moves` as parameter and will store that list in `special_move`.


```python
    @sp.entry_point
    def createMove(self, params):
        self.data.player[sp.sender].special_move = params.moves
```