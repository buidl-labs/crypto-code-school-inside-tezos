> `pair` is a unique datatype in smartPy which is nothing but a pair of 2 values. These values can be of any primitive datatype and need not be the same.

> To initialize a pair:

```python
test = sp.pair("", 0)
# this will initialize a pair with first element as sp.TString and second as sp.TInt
```

> Elements of a pair can be called by using `sp.fst(..)` to get the first element and `sp.snd(..)` to get the second element.

Example:

```python
sp.fst(test) # this will give you the first value of test
sp.snd(test) # this will give you the second value of test
```

> elements of a `pair` is immutable, that means, you cannot assign values to it's unique elements.

Example:

```python
sp.fst(test) = "change"
# this will give you error
```
Task:

1) declare and initialize a variable of type `sp.TPair(sp.TString, sp.TInt)` `power_move`

```python
self.init(power_move = sp.pair("", 0))
```