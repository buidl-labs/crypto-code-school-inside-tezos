> Python doesn't have concepts of structures, so to compensate for the same, smartPy has Records which act as structures only. This not only makes the contract more readable and understnadable but also makes it much more logical.

> Records in smartPy contract can be declared in the following manner

`Record = sp.record()`
or
`Record = sp.TRecord`

Task :

1) remove the various Plant attributes which were initialized earlier and also `attack` and `defense` functions as these functions will need to be updated.

2) Create a variable named `stat` which is a record containing the values of all the attributes of your Plant

`self.init(stat = sp.record(name = _name, attack = sp.int(0), defence = sp.int(0), health = sp.int(100), growth_rate = sp.int(5), is_alive = True))`