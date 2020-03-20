// Correct codes for each lesson

var _ = require('lodash');

//  intro
export const l1 = `import smartpy as sp`;

//scaffolding contract
export const l3 = `import smartpy as sp

class Plant(sp.Contract):
    pass`;

// state variable
export const l4 = `import smartpy as sp

class Plant(sp.Contract):
    def __init__(self, name):
        self.init(name = sp.string(name))`;

//integers
export const l5 = `import smartpy as sp

class Plant(sp.Contract):
    def __init__(self, name):
        self.init(name = sp.string(name), attack = sp.int(10), defense = sp.int(10), growth_rate = sp.int(10), health = sp.int(100))`;

// booleans
export const l6 = `import smartpy as sp

class Plant(sp.Contract):
    def __init__(self, name):
        self.init(name = sp.string(name), attack = sp.int(10), defense = sp.int(10), growth_rate = sp.int(10), health = sp.int(100), is_alive = True)`;

// creating a entry_point function
export const l7 = `import smartpy as sp

class Plant(sp.Contract):
    def __init__(self, name):
        self.init(name = sp.string(name), attack = sp.int(10), defense = sp.int(10), growth_rate = sp.int(10), health = sp.int(100), is_alive = True)

    @sp.entry_point
    def attack():
        pass

    @sp.entry_point
    def defense():
        pass`;

// math operations
export const l8 = `import smartpy as sp

class Plant(sp.Contract):
    def __init__(self, name):
        self.init(name = sp.string(name), attack = sp.int(10), defense = sp.int(10), growth_rate = sp.int(10), health = sp.int(100), is_alive = True)
        
    @sp.entry_point
    def attack(self, params):
        self.data.attack += params.attack

    @sp.entry_point
    def defense(self, params):
        self.data.defense += params.defense`;

// pairs
export const l9 = `import smartpy as sp

class Plant(sp.Contract):
    def __init__(self, name):
        self.init(name = sp.string(name), attack = sp.int(10), defense = sp.int(10), growth_rate = sp.int(10), health = sp.int(100), is_alive = True, power_move = sp.pair("Bullet Seed", 95))
        
    @sp.entry_point
    def attack(self, params):
        self.data.attack += params.attack

    @sp.entry_point
    def defense(self, params):
        self.data.defense += params.defense`;

// records
export const l10 = `import smartpy as sp

class Plant(sp.Contract):
    def __init__(self):
        self.init(stat = sp.record(name = "", attack = sp.int(10), defence = sp.int(10), health = sp.int(100), growth_rate = sp.int(10), is_alive = True))
        
    @sp.entry_point
    def attack(self, params):
        pass

    @sp.entry_point
    def defense(self, params):
        pass`;

//map
export const l11 = `import smartpy as sp

class Plant(sp.Contract):
    def __init__(self):
        self.init(player = sp.map(), stat = sp.record(name = "", attack = sp.int(10), defence = sp.int(10), health = sp.int(100), growth_rate = sp.int(10), is_alive = True))
    
    @sp.entry_point
    def attack(self, params):
        pass

    @sp.entry_point
    def defense(self, params):
        pass

    @sp.entry_point
    def assignChararter(self, params):
        self.data.player[params.sender] = self.data.stat
        self.data.player[params.sender].name = params.name`;

//address
export const l12 = `import smartpy as sp

class Plant(sp.Contract):
    def __init__(self):
        self.init(player = sp.map(), stat = sp.record(name = "", attack = sp.int(10), defence = sp.int(10), health = sp.int(100), growth_rate = sp.int(10), is_alive = True))
    
    @sp.entry_point
    def attack(self, params):
        self.data.player[sp.sender].attack += params.attack

    @sp.entry_point
    def defense(self, params):
        self.data.player[sp.sender].defence += params.defence

    @sp.entry_point
    def assignChararter(self, params):
        self.data.player[sp.sender] = self.data.stat
        self.data.player[sp.sender].name = params.name`;

//list
export const l13 = `import smartpy as sp

class Plant(sp.Contract):
    def __init__(self):
        self.init(player = sp.map(), stat = sp.record(name = "", attack = sp.int(10), defence = sp.int(10), health = sp.int(100), growth_rate = sp.int(10), is_alive = True, special_moves = []))
    
    @sp.entry_point
    def attack(self, params):
        self.data.player[sp.sender].attack += params.attack

    @sp.entry_point
    def defense(self, params):
        self.data.player[sp.sender].defence += params.defence

    @sp.entry_point
    def assignChararter(self, params):
        self.data.player[sp.sender] = self.data.stat
        self.data.player[sp.sender].name = params.name
    
    @sp.entry_point
    def createMove(self, params):
        self.data.player[sp.sender].special_move = params.moves`;

//if\else
export const l14 = `import smartpy as sp

class Plant(sp.Contract):
    def __init__(self):
        self.init(player = sp.map(), stat = sp.record(name = "", attack = sp.int(10), defence = sp.int(10), health = sp.int(100), growth_rate = sp.int(10), is_alive = True, special_moves = []))
    
    @sp.entry_point
    def attack(self, params):
        self.data.player[sp.sender].attack += params.attack

    @sp.entry_point
    def defense(self, params):
        self.data.player[sp.sender].defence += params.defence

    @sp.entry_point
    def assignChararter(self, params):
        sp.if ~ self.data.player.contains(sp.sender):
            self.data.player[sp.sender] = self.data.stat
            self.data.player[sp.sender].name = params.name
        sp.else:
            pass
    
    @sp.entry_point
    def createMove(self, params):
        self.data.player[sp.sender].special_move = params.moves`;

//verify
export const l15 = `import smartpy as sp

class Plant(sp.Contract):
    def __init__(self):
        self.init(player = sp.map(), stat = sp.record(name = "", attack = sp.int(10), defence = sp.int(10), health = sp.int(100), growth_rate = sp.int(10), is_alive = True, special_moves = []))
    
    @sp.entry_point
    def attack(self, params):
        self.data.player[sp.sender].attack += params.attack

    @sp.entry_point
    def defense(self, params):
        self.data.player[sp.sender].defence += params.defence

    @sp.entry_point
    def assignChararter(self, params):
        sp.verify(~ self.data.player.contains(sp.sender), "User already have a character")
        self.data.player[sp.sender] = self.data.Character
        self.data.player[sp.sender].name = params.name
    
    @sp.entry_point
    def createMove(self, params):
        self.data.player[sp.sender].special_move = params.moves

    @sp.entry_point
    def endGame(self, params):
        sp.verify(self.data.player[sp.sender].health == 0, "You are not dead")
        self.data.player[sp.sender].is_alive = False`;

//-----Error messages for each line------//

var errors = {
  1: 'smartpy not imported',
  2: 'Contract declared error',
  3: 'Contract not initialized',
  4: 'Variables declaration error',
  5: '@entry_point not declared',
  6: 'function declaration error',
  7: 'wrong operation for state variable',
  8: '@entry_point not declared',
  9: 'function declaration error',
  10: 'wrong operation for state variable',
  11: '@entry_point not declared',
  12: 'function declaration error',
  13: 'invalid expression in verify statement',
  14: 'invalid assignment of state variable',
  15: 'invalid assignment of state variable',
  16: '@entry_point not declared',
  17: 'function declaration error',
  18: 'invalid assignment of pairs in list',
  19: '@entry_point not declared',
  20: 'function declaration error',
  21: 'invalid expression in verify statement',
  22: 'invalid assignment of state variable',
};

var missing = {
  'import smartpy as sp': 'import statement missing or invalid',

  'class Plant(sp.Contract):':
    'class (Contract) declaration missing or invalid',

  'def __init__(self):':
    'class initialization missing or invalid or `self` parameter is not provided',

  'def __init__(self, name):':
    'class initialization require a `name & self`  parameter',

  'self.init(name = sp.string(name))':
    'name `sp.TString` initialization is missing or is invalid',

  'self.init(name = sp.string(name), attack = sp.int(10), defense = sp.int(10), growth_rate = sp.int(10), health = sp.int(100))':
    'state variables initialization is missing or is invalid',

  'self.init(name = sp.string(name), attack = sp.int(10), defense = sp.int(10), growth_rate = sp.int(10), health = sp.int(100), is_alive = True)':
    'is_alive `sp.TBoolean` initialization is missing or is invalid',

  'self.init(name = sp.string(name), attack = sp.int(10), defense = sp.int(10), growth_rate = sp.int(10), health = sp.int(100), is_alive = True, power_move = sp.pair("Bullet Seed", 95))':
    'power_move `sp.TPair` initialization is missing or is invalid',

  'self.init(stat = sp.record(name = "", attack = sp.int(10), defence = sp.int(10), health = sp.int(100), growth_rate = sp.int(10), is_alive = True))':
    'stat `sp.TRecord` initialization is missing or is invalid',

  'self.init(player = sp.map(), stat = sp.record(name = "", attack = sp.int(10), defence = sp.int(10), health = sp.int(100), growth_rate = sp.int(10), is_alive = True))':
    'player `sp.TMap` initialization is missing or is invalid',

  'self.init(player = sp.map(), stat = sp.record(name = "", attack = sp.int(10), defence = sp.int(10), health = sp.int(100), growth_rate = sp.int(10), is_alive = True, special_moves = []))':
    'special_moves array (sp.TList) initialization is missing or is invalid',

  '@sp.entry_point': '@sp.entry_point decorator missing or invalid',

  'def attack():': 'attack function declaration error',
  'def attack(self, params):': 'attack function declaration error',
  'self.data.attack += params.attack':
    'invalid or missing statement in attack function',
  'self.data.player[sp.sender].attack += params.attack':
    'invalid or missing statement in attack function',

  pass: 'cannot have an empty function (add `pass`)',

  'def defense():': 'defence function declaration error',
  'def defense(self, params):': 'defence function declaration error',
  'self.data.defense += params.defense':
    'invalid or missing statement in defense function',
  'self.data.player[sp.sender].defence += params.defence':
    'invalid or missing statement in defense function',

  'def assignChararter(self, params):':
    'assignChararter function declaration error',
  'self.data.player[params.sender] = self.data.stat':
    'invalid or missing assignment statement in assignChararter()',
  'self.data.player[sp.sender] = self.data.stat':
    'invalid or missing assignment statement in assignChararter()',
  'self.data.player[params.sender].name = params.name`;':
    'invalid or missing assignment statement in assignChararter()',
  'self.data.player[sp.sender].name = params.name':
    'invalid or missing assignment statement in assignChararter()',
  'sp.verify(~ self.data.player.contains(sp.sender), "User already have a character")':
    'missing or invalid verification in assignChararter()',

  'def endGame(self, params):': 'endGame function declaration error',
  'self.data.player[sp.sender].is_alive = False':
    'missing or invalid assignment in endGame function',
  'sp.verify(self.data.player[sp.sender].health == 0, "You are not dead")':
    'missing or invalid verification in endGame()',

  'def createMove(self, params):': 'createMove function declaration error',
  'self.data.player[sp.sender].special_move = params.moves':
    'invalid or missing statmenet in createMove()',

  'sp.if ~ self.data.player.contains(sp.sender):':
    'invalid or missing condition in `if` statement',
  'sp.else:': 'missing else block',
};

//-----Function to check user code and return error as object type {`line number`: `error message`}-----//

/**
 *
 * @param {*} get --> value
 * @param {*} lesson --> current lesson number
 * @returns {} {
 *  success: true/false
 *  error: `result[404][0] "at line" result[0].key(line number)`
 * }
 */

//remove blank spaces from user input
export function checkCode(get, lesson) {
  if (lesson === 1) {
    lesson = l1;
  } else if (lesson === 2) {
    return { success: true, error: ['No error'] };
  } else if (lesson === 3) {
    lesson = l3;
  } else if (lesson === 4) {
    lesson = l4;
  } else if (lesson === 5) {
    lesson = l5;
  } else if (lesson === 6) {
    lesson = l6;
  } else if (lesson === 7) {
    lesson = l7;
  } else if (lesson === 8) {
    lesson = l8;
  } else if (lesson === 9) {
    lesson = l9;
  } else if (lesson === 10) {
    lesson = l10;
  } else if (lesson === 11) {
    lesson = l11;
  } else if (lesson === 12) {
    lesson = l12;
  } else if (lesson === 13) {
    lesson = l13;
  } else if (lesson === 14) {
    lesson = l14;
  } else if (lesson === 15) {
    lesson = l15;
  }

  // user - this is the array of each line of the code which user types in the editor,
  // lesson - this is the code from the above variables, ex: for lesson 1, use l1, lesson 3 - l3 and so on...

  // result to be print result[line_number] = error message
  var result = {};

  // spliting user's code to get array of lines
  var user = get.split('\n');

  // removing '\r' from the end of each element(line).
  for (var x in user) {
    user[x] = user[x].replace('\r;', '');
  }

  // removing new lines and white spaces from the user's code
  var userArray = user.filter(function(entry) {
    return entry.trim() !== '';
  });

  // removing valid python comments starting with #
  userArray = userArray.filter(x => x.trim()[0] !== '#');

  // getting all invalid comments `//` as valid comments `#` are already removed
  var commentsTest = userArray.filter(line => line.trim().includes('//', 0));

  console.log('THIS IS COMMENT LINEs', commentsTest);

  // error message for all the invalid comment lines
  for (var comment in commentsTest) {
    result[user.indexOf(commentsTest[comment]) + 1] =
      'Comments in python starts with #';
  }

  // updating user array and removing invalid comments as well
  userArray = userArray.filter(x => !x.trim().includes('//', 0));

  // getting array from the correct code (each line is an element of the array)
  var code = lesson.split('\n');

  // removing new lines and white spaces from the correct code
  var correctCodeArray = code.filter(function(entry) {
    return entry.trim() !== '';
  });

  // length of the array of user's code
  var i = userArray.length;

  // length of the array of correct code
  var j = correctCodeArray.length;

  // list of lines (code) that user didn't write
  var missingFromUser = correctCodeArray.filter(w => !userArray.includes(w));

  if (
    missingFromUser.indexOf('        pass') === -1 &&
    _.countBy(correctCodeArray)['        pass'] !==
      _.countBy(userArray)['        pass']
  ) {
    missingFromUser.push('        pass');
  }
  // var correct = _.countBy(correctCodeArray);
  // var user = _.countBy(userArray);

  // console.log(correct['        pass'])
  // console.log(user['        pass'])
  // console.log(correctCodeArray.indexOf('        pass'));
  // console.log(userArray.indexOf('        pass'));

  // list of extra lines (code) thats user wrote
  var extraInUser = userArray.filter(w => !correctCodeArray.includes(w));

  console.log('USER ARRAY', userArray);
  console.log('CORRECT ARRAY', correctCodeArray);

  console.log('MISSING', missingFromUser);
  console.log('EXTRA', extraInUser);

  //l10 get pass
  if (lesson === l10) {
    missing['pass'] =
      'Remove assignment statement in attack and defense functions as they are not valid at this moment. Add `pass`';
  }

  // invalid statements of extra line of codes
  for (i in extraInUser) {
    if (lesson === l12 && extraInUser[i].trim() === 'pass') {
      result[user.indexOf(extraInUser[i]) + 1] =
        'Invalid statement, remove `pass and update the function with appropriate statement`';
    } else {
      result[user.indexOf(extraInUser[i]) + 1] = 'Invalid statement';
    }
  }

  console.log(missingFromUser.length);

  if (missingFromUser.length !== 0) {
    result[404] = [];
    for (i in missingFromUser) {
      result[404].push(missing[missingFromUser[i].trim()]);
    }
  }

  console.log(i, j);

  console.log('RESULT', result);

  var FINAL_RESULT = {
    success: null,
    error: null,
  };

  var RR = Object.keys(result);
  console.log('RR');

  if (RR.length === 0) {
    FINAL_RESULT = {
      success: true,
      error: [''],
    };

    return FINAL_RESULT;
  } else {
    RR = RR.filter(function(value) {
      return value < 404;
    });

    var err = result[404];

    var lines = RR.length;
    var errors = err.length;

    var resFinal = [];

    if (lines === errors) {
      for (var i = 0; i < lines; i++) {
        resFinal.push(err[i] + ' at line ' + RR[i]);
      }
    } else if (lines < errors) {
      var i = 0;

      while (i < lines) {
        resFinal.push(err[i] + ' at line ' + RR[i]);
        i++;
      }
      while (i < errors) {
        resFinal.push(err[i]);
        i++;
      }
    } else if (lines > errors) {
      var i = 0;

      while (i < errors) {
        resFinal.push(err[i] + ' at line ' + RR[i]);
        i++;
      }
      while (i < lines) {
        resFinal.push(result[RR[i]] + ' at line ' + RR[i]);
        i++;
      }
    }

    console.log('\nFINAL RESULT\n', resFinal);

    FINAL_RESULT = {
      success: false,
      error: resFinal,
    };

    return FINAL_RESULT;
  }

  //   console.log(Object.values(result));

  //   return result;

  // // if length of array is different then return the with the line number which is more that the expect code.
  // if (i!==j){

  //     // getting which code (array) has more number of lines are then getting line number and appropriate error message
  //     i<j ? result[user.indexOf(userArray[i-1])+2] = "Missing Code":result[user.indexOf(userArray[j])+1] = "Invalid Code";

  //     return result;
  // }

  // else{
  //     // if both codes (arrays) has equal number of lines then iterate through array and check for the correctness
  //     for(var k=0; k<i; k++){

  //         // if user's element (line) is same as the correct code then continue with next element
  //         if(correctCodeArray[k] === userArray[k]){
  //             continue;
  //         }

  //         // if elements are not equal then get the line number of the line in code editor and push appropriate result in the dictinoary
  //         else{
  //             var idx = user.indexOf(userArray[k])+1;
  //             result[idx] = errors[k+1];
  //         }
  //     }

  //     return result;
  // }
}
