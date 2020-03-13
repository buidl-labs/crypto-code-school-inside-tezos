> Now you will dive deeper into smart contract and will provide actions to your Character.

> In python, there are @classmethod decorators which are used to call methods without creating a class object. Similarly in smartPy, there is a decorator `@sp.entry_point` which is used to declare entry point of the contract which can be called by the user

```python
@sp.entry_point
def function(self, params):
    # function logic
```

Task : Declare 2 functions attack and defence for your plant
```python
@sp.entry_point
def attack():

@sp.entry_point
def defense():
```