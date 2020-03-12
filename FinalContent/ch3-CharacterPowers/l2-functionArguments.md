> Function Arguments,
> Each class function in python takes the first parameter as `self`, which acts as `this` and points to class methods and variable.

For Example:

```python

class Test():

    def __init__(self):
        self.data = None

    def changeData(self, _data):
        self.data = _data
```

> Similarly in smartPy, each function (entry_point)should have the first parameter as `self`.

> After `self` the entry points takes a list of parameters which are declared as `params`. All the parameters are named parameters and are called using `params.name`

For Example:

```python
# suppose we want to set the data as 5 and we are sending data parameter while calling the test function.
def test(self, params):
    self.data = params.data
    # self.data is the contract variable
    # params.data is the named parameter
```

Task:
Declare arguments for the attack defence functions
```python
@sp.entry_point
def attack(self, params):

@sp.entry_point
def defense(self, params):
```
