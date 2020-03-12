> SmartPy support all the basic arithmetic operators and behave just like in python. 

`+, -, *, /, //, %`

> These arithmetic operators can be used to manipulate sp.Int values in the smart contract. 

> For example, If you attack a zombie, his health should decrease.

`self.data.health -= params.attack`

Task : Complete the attack and defence functions and upgrade attack and defence of your plant.

```python
@sp.entry_point
def attack(self, params):
    self.data.attack += params.attack

@sp.entry_point
def defense(self, params):
    self.data.defense += params.defense
```