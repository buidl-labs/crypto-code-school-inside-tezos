> Mapping is a kind of hash table which contains key-pair values. 

> In smartpy, maps are initialized in the following manner,

Example : 
`Map = sp.map()`

> SmartPy has an inbuilt function `map.contains(key)` to check if a certain key is already available in the mapping or not. If the key is present, then it will return `True`, otherwise `False`.

> Mapping will be used to point your tezos wallet address with your character.

Task :

1) Declare a variable `player` of type mapping and initialize it as an empty map

`player = sp.map() # edit in self.init`

2) Create an entry_point `assignPlant` which will take one string parameter `name` which will be name of your plant.

```python
    @sp.entry_point
    def assignChar(self, params):
        self.data.player[params.sender] = self.data.stat
        self.data.player[params.sender].name = params.name
```