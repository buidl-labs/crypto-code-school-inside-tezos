> Constructor function in python __init__ function

> Parameters to be passed in __init__ function

> defining the constructor function

```python
import smartpy as sp

class Plant(sp.Contact):
    def __init__(self, params):
```

> Constructor calls only one function self.init which is used to delare all the variables to be used in the contract

```python

class Plant(sp.Contact):
    def __init__(self, params):
        self.init(variables = type)
```

Tasks : 
Initialize the constructor for the plant contract and provide a parameter _name as `def __init__ (self, _name)`