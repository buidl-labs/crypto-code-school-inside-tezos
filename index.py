import smartpy as sp

class ZombieRoom(sp.Contract):
    def __init__(self, rooms):
        self.init(rooms = rooms, gameInfo = sp.none)
    
    
    @sp.entry_point
    def hasZombieInRoomNo(self, roomNumber):
        result = sp.some(self.data.rooms[roomNumber]);
        self.data.gameInfo = sp.some(result)
    
    
@sp.add_test(name = "ZombieTest")
def test():
    scenario = sp.test_scenario()
    # Create HTML output for debugging
    scenario.h1("Zombie Room Game")
    rooms = sp.vector(
        [{"hasZombie": False}, {"hasZombie": True}, {"hasZombie": True}])
    c1 = ZombieRoom(rooms)
    
    # Print contract instance to HTML
    scenario += c1
    # Invoke ZombieRoom entry points and print results to HTML    
    scenario.h2("Check whether the random room has zombie or not")
    scenario += c1.hasZombieInRoomNo(1)
