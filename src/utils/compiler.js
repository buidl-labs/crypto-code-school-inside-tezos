// Correct codes for each lesson

var _ = require('lodash');

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
    'constructor initialization missing or invalid or `self` parameter is not provided',

  'def __init__(self, name):':
    'constructor initialization require a `name & self` parameter',

  'self.init(name = name)':
    'name of type `sp.TString` initialization is missing or is invalid',

  'self.init(name = "peashooter")':
    'name of type `sp.TString` initialization is missing or is invalid',

  pass: 'cannot have an empty function (add `pass`)',

  '@sp.add_test(name = "Test Plant Contract")':
    '@sp.add_test decorator missing or invalid',

  'def test():': 'test function declaration error',

  'scenario = sp.test_scenario()':
    'invalid or missing  test scenario declaration',

  'plant_test_contract = Plant()':
    'invalid or missing Plant class initialization',

  'scenario += plant_test_contract':
    'invalid or missing plant contract assignment',

  '@sp.entry_point': '@sp.entry_point decorator missing or invalid',

  'def change_name(self, params):': 'change_name function declaration error',

  'self.data.name = params.new_name': 'invalid or missing name assignment',

  'scenario += plant_test_contract.change_name(new_name = "funky peashooter")':
    'invalid or missing change_name entry point function initialization',

  'def __init__(self, life_state):':
    'constructor initialization require a `self and life_state` parameter',

  'is_alive = life_state': 'invalid or missing is_alive assignment',

  'plant_test_contract =  Plant(life_state = True)':
    'life_state of type `sp.TBool` initialization is missing or invalid',

  'scenario.verify(plant_test_contract.data.is_alive == True)':
    'invalid or missing scenario.verify method initialization',
  //For chapter 10
  'coordinate_x = sp.int(0),':
    'coordinate_x of type `sp.TInt` initialization is missing or invalid',
  'coordinate_y = sp.nat(0)':
    'coordinate_y of type `sp.TNat` initialization is missing or invalid',
  'def move_horizontally(self, update_to):':
    'move_horizontally function declaration error',
  'self.data.coordinate_x += update_to':
    'invalid or missing coordinate_x assignment',
  'def move_vertically(self, update_to):':
    'move_vertically function declaration error',
  'self.data.coordinate_y += update_to':
    'invalid or missing coordinate_y assignment',
  'scenario += plant_test_contract.move_horizontally(2)':
    'invalid or missing move_horizontally method initialization',
  'scenario += plant_test_contract.move_vertically(1)':
    'invalid or missing move_vertically method initialization',

  //For chapter 11
  'bullet_seed_count = 5,':
    'invalid or missing bullet_seed_count variable assignment',
  'record_zombie_kills = {"simple_zombie":sp.nat(0), "boss_zombie":sp.nat(0)}':
    'invalid or missing record_zombie_kills variable assignment',
  'self.data.bullet_seed_count -= 1':
    'invalid or missing bullet_seed_count variable assignment',
  'self.data.record_zombie_kills[zombie_type] += 1':
    'invalid or missing record_zombie_kills variable assignment',
  'scenario += plant_test_contract.shoot_zombie("simple_zombie")':
    'invalid or missing shoot_zombie method initialization',
  'scenario += plant_test_contract.shoot_zombie("boss_zombie")':
    'invalid or missing shoot_zombie method initialization',
  //For chapter 12
  'def __init__(self, life_state, manager_address):':
    'constructor initialization require a `self, life_state and manager_address` parameter',
  'plant_manager = manager_address,':
    'invalid or missing plant_manager variable assignment',
  'my_address = sp.address("tz1Syu3KacZ8cy4286a4vaCeoMtwqVKHkaoj")':
    'my_address of type `sp.TAddress` assignment is missing or is invalid',
  'plant_test_contract =  Plant(life_state = True, manager_address = my_address)':
    'invalid or missing plant_test_contract variable assignment',

  //For chapter 13
  'sp.verify(self.data.plant_manager == sp.sender, message = "Error: you are not the manager of this plant")':
    'invalid or missing sp.verify method initialization',
  'scenario += plant_test_contract.shoot_zombie("simple_zombie").run(sender = my_address)':
    'invalid or missing run method initialization',
  'scenario += plant_test_contract.shoot_zombie("boss_zombie").run(sender = my_address)':
    'invalid or missing run method initialization',
  // 'self.init(name = name, attack = sp.nat(10), defense = sp.nat(10), growth_rate = sp.nat(10), health = sp.nat(100))':
  //   'state variables initialization is missing or is invalid',

  // 'self.init(name = name, attack = sp.nat(10), defense = sp.nat(10), growth_rate = sp.nat(10), health = sp.nat(100), is_alive = True)':
  //   'is_alive of type `sp.TBoolean` initialization is missing or is invalid',

  // 'self.init(name = name, attack = sp.nat(10), defense = sp.nat(10), growth_rate = sp.nat(10), health = sp.nat(100), is_alive = True, power_move = ("Bullet Seed", 95))':
  //   'power_move of type `sp.TPair` initialization is missing or is invalid',

  // 'self.init(stat = sp.record(name = "", attack = sp.nat(10), defense = sp.nat(10), health = sp.nat(100), growth_rate = sp.nat(10), is_alive = True))':
  //   'stat of type `sp.TRecord` initialization is missing or is invalid',

  // 'self.init(player = sp.map(), stat = sp.record(name = "", attack = sp.nat(10), defense = sp.nat(10), health = sp.nat(100), growth_rate = sp.nat(10), is_alive = True))':
  //   'player of type `sp.TMap` initialization is missing or is invalid',

  // 'self.init(player = sp.map(), stat = sp.record(name = "", attack = sp.nat(10), defense = sp.nat(10), health = sp.nat(100), growth_rate = sp.nat(10), is_alive = True, special_moves = []))':
  //   'special_moves array (sp.TList) initialization is missing or is invalid',

  // '@sp.entry_point': '@sp.entry_point decorator missing or invalid',

  // 'def attack(self):': 'attack function declaration error',
  // 'def attack(self, params):': 'attack function declaration error',
  // 'self.data.attack += params.attack':
  //   'invalid or missing statement in attack function',
  // 'self.data.player[sp.sender].attack += params.attack':
  //   'invalid or missing statement in attack function',

  // 'def defense(self):': 'defense function declaration error',
  // 'def defense(self, params):': 'defense function declaration error',
  // 'self.data.defense += params.defense':
  //   'invalid or missing statement in defense function',
  // 'self.data.player[sp.sender].defense += params.defense':
  //   'invalid or missing statement in defense function',

  // 'def assignChararter(self, params):':
  //   'assignChararter function declaration error',
  // 'self.data.player[params.sender] = self.data.stat':
  //   'invalid or missing assignment statement in assignChararter()',
  // 'self.data.player[sp.sender] = self.data.stat':
  //   'invalid or missing assignment statement in assignChararter()',
  // 'self.data.player[params.sender].name = params.name':
  //   'invalid or missing assignment statement in assignChararter()',
  // 'self.data.player[sp.sender].name = params.name':
  //   'invalid or missing assignment statement in assignChararter()',
  // 'sp.verify(~ self.data.player.contains(sp.sender), "User already has a plant")':
  //   'missing or invalid verification in assignChararter()',

  // 'def endGame(self, params):': 'endGame function declaration error',
  // 'self.data.player[sp.sender].is_alive = False':
  //   'missing or invalid assignment in endGame function',
  // 'sp.verify(self.data.player[sp.sender].health == 0, "You are alive!!!")':
  //   'missing or invalid verification in endGame()',

  // 'def createMove(self, params):': 'createMove function declaration error',
  // 'self.data.player[sp.sender].special_moves = params.moves':
  //   'invalid or missing statmenet in createMove()',

  // 'sp.if ~ self.data.player.contains(sp.sender):':
  //   'invalid or missing condition in `if` statement',
  // 'sp.else:': 'missing else block',
};

//-----Function to check user code and return error as object type {`line number`: `error message`}-----//

/**
 *
 * @param {*} get --> user input value
 * @param {*} lesson --> current chapter solution
 * @returns {} {
 *  success: true/false
 *  error: `result[404][0] "at line" result[0].key(line number)`
 * }
 */

/**
 * Ignore Comments, semicolons, handle (double)"" and single('') quotes
 */
// TODO: refactor code logic for maintenance
//In Progress
// function getFilteredCode(code) {
//   // splitting user's code to get array of lines
//   let splittedCode = code.split('\n');

//   // removing '\r' from the end of each element(line).
//   for (const x in splittedCode) {
//     splittedCode[x] = splittedCode[x].replace('\r', '');
//   }

//   // removing ; as it doesnot gives error
//   for (const x in splittedCode) {
//     splittedCode[x] = splittedCode[x].replace(';', '');
//   }

//   // replacing tabs with spaces
//   for (const a in splittedCode) {
//     splittedCode[a] = splittedCode[a].replace('\t', '  ');
//   }

//   // removing extra spaces from the end of line
//   for (const a in splittedCode) {
//     splittedCode[a] = splittedCode[a].trimRight();
//   }

//   // replacing (single quotes '') with (double quotes ")
//   for (const a in splittedCode) {
//     splittedCode[a] = splittedCode[a].split(`'`).join(`"`);
//   }

//   // removing new lines and white spaces from the user's code
//   let filteredCode = splittedCode.filter(function(entry) {
//     return entry.trim() !== '';
//   });

//   // removing valid python comments starting with #
//   filteredCode = filteredCode.filter(x => x.trim()[0] !== '#');
//   console.log('filteredCode', filteredCode);
//   return filteredCode;
// }

//remove blank spaces from user input
export function checkCode(get, lesson) {
  // user - this is the array of each line of the code which user types in the editor,
  // lesson - this is the code from the above variables, ex: for lesson 1, use l1, lesson 3 - l2 and so on...
  // result to be print result[line_number] = error message
  var result = {};

  // spliting user's code to get array of lines
  var user = get.split('\n');
  //console.log("SURAJ", user);

  // removing '\r' from the end of each element(line).
  for (var x in user) {
    user[x] = user[x].replace('\r', '');
  }

  // removing ; as it doesnot gives error
  for (var x in user) {
    user[x] = user[x].replace(';', '');
  }

  // replacing tabs with spaces
  for (var a in user) {
    user[a] = user[a].replace('\t', '  ');
  }

  // removing extra spaces from the end of line
  for (var a in user) {
    user[a] = user[a].trimRight();
  }

  // console.log("USER", user);

  // replacing ' with "
  for (var a in user) {
    user[a] = user[a].split(`'`).join(`"`);
  }

  // console.log("USER2", user)

  // removing new lines and white spaces from the user's code
  var userArray = user.filter(function(entry) {
    return entry.trim() !== '';
  });

  // if (lesson === 'l2') {
  //   // getting array from the correct code (each line is an element of the array)
  //   var testl2 = l1.split('\n');

  //   //console.log("TEST L2", testl2);

  //   // removing new lines and white spaces from the correct code
  //   var correctl2 = testl2.filter(function (entry) {
  //     return entry.trim() !== '';
  //   });

  //   //console.log("2 TEST L2", correctl2);

  //   var comment = userArray.filter(x => !correctl2.includes(x));

  //   var final = comment.filter(z => z.trim()[0] === '#');
  //   var com = comment.filter(z => z.trim()[0] !== '#');

  //   //console.log("L2 COMMENT", comment);
  //   //console.log("L2 FINAL", final);
  //   //console.log("L2 COM", com);

  //   var comError = [];

  //   if (com.length > 0) {
  //     for (var c in com) {
  //       comError.push('Invalid code at line ' + (user.indexOf(com[c]) + 1));
  //     }
  //     return {
  //       success: false,
  //       error: comError,
  //     };
  //   } else if (final.length === 0) {
  //     return { success: false, error: ['comment is required.'] };
  //   } else {
  //     return { success: true, error: ['No error'] };
  //   }
  // }
  // removing valid python comments starting with #
  userArray = userArray.filter(x => x.trim()[0] !== '#');

  // getting all invalid comments `//` as valid comments `#` are already removed
  var commentsTest = userArray.filter(line => line.trim().includes('//', 0));

  //console.log('THIS IS COMMENT LINEs', commentsTest);

  // error message for all the invalid comment lines
  for (var comments in commentsTest) {
    result[user.indexOf(commentsTest[comments]) + 1] =
      'Comments in python starts with #';
  }

  // updating user array and removing invalid comments as well
  // var userArray = userArray.filter(x => !x.trim().includes('//', 0));
  var userRemoveInvalidCommentArray = userArray.filter(
    x => !x.trim().includes('//', 0),
  );

  // dict = {withoutSpace : withspaceOriginal}
  userArray = {};

  // replacing all spaces in lines
  for (var a in userRemoveInvalidCommentArray) {
    userArray[
      userRemoveInvalidCommentArray[a]
        .split(` , `)
        .join(`,`)
        .split(`, `)
        .join(`,`)
        .split(` ,`)
        .join(`,`)
        .split(` ~ `)
        .join(`~`)
        .split(`~ `)
        .join(`~`)
        .split(` ~`)
        .join(`~`)
        .split(` : `)
        .join(`:`)
        .split(`: `)
        .join(`:`)
        .split(` :`)
        .join(`:`)
        .split(`( `)
        .join(`(`)
        .split(` )`)
        .join(`)`)
        .split(` = `)
        .join(`=`)
        .split(`= `)
        .join(`=`)
        .split(` =`)
        .join(`=`)
        .split(` ' `)
        .join(`'`)
        .split(` '`)
        .join(`'`)
        .split(`' `)
        .join(`'`)
        .split(` " `)
        .join(`"`)
        .split(` "`)
        .join(`"`)
        .split(`" `)
        .join(`"`)
    ] = userRemoveInvalidCommentArray[a];
    // userArray[userRemoveInvalidCommentArray[a].substr(0,userRemoveInvalidCommentArray[a].length - userRemoveInvalidCommentArray[a].trimLeft().length) + userRemoveInvalidCommentArray[a].split(" ").join("")] = userRemoveInvalidCommentArray[a];
  }

  // console.log("USER", userArray);
  // --------------------------------

  // getting array from the correct code (each line is an element of the array)
  var code = lesson.split('\n');

  // removing new lines and white spaces from the correct code
  // var correctCodeArray = code.filter(function (entry) {
  var correctCodeArrayWithSpace = code.filter(function(entry) {
    return entry.trim() !== '';
  });

  correctCodeArrayWithSpace = correctCodeArrayWithSpace.filter(
    x => x.trim()[0] !== '#',
  );

  // dict = {withoutSpace : withspaceOriginal}
  var correctCodeArray = {};

  // replacing all spaces in lines
  for (var a in correctCodeArrayWithSpace) {
    correctCodeArray[
      correctCodeArrayWithSpace[a]
        .split(` , `)
        .join(`,`)
        .split(`, `)
        .join(`,`)
        .split(` ,`)
        .join(`,`)
        .split(` ~ `)
        .join(`~`)
        .split(`~ `)
        .join(`~`)
        .split(` ~`)
        .join(`~`)
        .split(` : `)
        .join(`:`)
        .split(`: `)
        .join(`:`)
        .split(` :`)
        .join(`:`)
        .split(`( `)
        .join(`(`)
        .split(` )`)
        .join(`)`)
        .split(` = `)
        .join(`=`)
        .split(`= `)
        .join(`=`)
        .split(` =`)
        .join(`=`)
        .split(` ' `)
        .join(`'`)
        .split(` '`)
        .join(`'`)
        .split(`' `)
        .join(`'`)
        .split(` " `)
        .join(`"`)
        .split(` "`)
        .join(`"`)
        .split(`" `)
        .join(`"`)
    ] = correctCodeArrayWithSpace[a];
    // correctCodeArray[correctCodeArrayWithSpace[a].substr(0,correctCodeArrayWithSpace[a].length - correctCodeArrayWithSpace[a].trimLeft().length) + correctCodeArrayWithSpace[a].split(" ").join("")] = correctCodeArrayWithSpace[a];
  }

  // console.log("CODE", correctCodeArray);
  // length of the array of user's code
  var i = userArray.length;

  // length of the array of correct code
  var j = correctCodeArray.length;

  // list of lines (code) that user didn't write
  // var missingFromUser = correctCodeArray.filter(w => !userArray.includes(w));
  var missingFromUser = []; // it has code without space
  for (a in correctCodeArray) {
    if (userArray[a] === undefined) {
      missingFromUser.push(a);
    } else {
      continue;
    }
  }

  if (
    missingFromUser.indexOf('        pass') === -1 &&
    _.countBy(correctCodeArrayWithSpace)['        pass'] >
      _.countBy(userRemoveInvalidCommentArray)['        pass']
    // _.countBy(correctCodeArray)['        pass'] >
    // _.countBy(userArray)['        pass']
  ) {
    missingFromUser.push('        pass');
  }

  if (
    missingFromUser.indexOf('    @sp.entry_point') === -1 &&
    _.countBy(correctCodeArrayWithSpace)['    @sp.entry_point'] >
      _.countBy(userRemoveInvalidCommentArray)['    @sp.entry_point']
  ) {
    missingFromUser.push('    @sp.entry_point');
  }

  // var correct = _.countBy(correctCodeArray);
  // var user = _.countBy(userArray);

  // //console.log(correct['        pass'])
  // //console.log(user['        pass'])
  // //console.log(correctCodeArray.indexOf('        pass'));
  // //console.log(userArray.indexOf('        pass'));

  // list of extra lines (code) thats user wrote
  // var extraInUser = userArray.filter(w => !correctCodeArray.includes(w));
  var extraInUser = []; // it has code without space
  for (a in userArray) {
    if (correctCodeArray[a] === undefined) {
      extraInUser.push(a);
    } else {
      continue;
    }
  }

  // console.log('USER ARRAY', userArray);
  // console.log('CORRECT ARRAY', correctCodeArray);

  // console.log('MISSING', missingFromUser);
  // console.log('EXTRA', extraInUser);

  //l9 get pass
  // if (lesson === l9) {
  //   missing['pass'] =
  //     'Remove assignment statement in attack and defense functions as they are not valid at this moment. Add `pass`';
  // }

  // invalid statements of extra line of codes
  for (i in extraInUser) {
    if (extraInUser[i].trim() === 'pass') {
      result[user.indexOf(userArray[extraInUser[i]]) + 1] =
        // result[user.indexOf(extraInUser[i]) + 1] =
        'Invalid statement, remove `pass and update the function with appropriate statement`';
      //console.log("RESULT", result);
    } else {
      result[user.indexOf(userArray[extraInUser[i]]) + 1] = 'Invalid statement';
      // result[user.indexOf(extraInUser[i]) + 1] = 'Invalid statement';
    }
  }
  //console.log("RESULT2", result);
  //console.log(missingFromUser.length);

  if (missingFromUser.length !== 0) {
    result[404] = [];
    for (i in missingFromUser) {
      result[404].push(missing[correctCodeArray[missingFromUser[i]].trim()]);
      // result[404].push(missing[missingFromUser[i].trim()]);
    }
  }
  //console.log("RESULT3", result);
  //console.log(i, j);

  //console.log('RESULT', result);

  var FINAL_RESULT = {
    success: null,
    error: null,
  };

  var RR = Object.keys(result);
  //console.log('RR', RR);

  if (RR.length === 0) {
    FINAL_RESULT = {
      success: true,
      error: [''],
    };

    return FINAL_RESULT;
  } else {
    if (404 in result) {
      RR = RR.filter(function(value) {
        return value < 404;
      });

      var err = result[404];

      var lines = RR.length;
      var errors = err.length;

      var resFinal = [];

      if (lines === errors) {
        for (var b = 0; b < lines; b++) {
          resFinal.push(err[b] + ' at line ' + RR[b]);
        }
      } else if (lines < errors) {
        var n = 0;

        while (n < lines) {
          resFinal.push(err[n] + ' at line ' + RR[n]);
          n++;
        }
        while (n < errors) {
          resFinal.push(err[n]);
          n++;
        }
      } else if (lines > errors) {
        var m = 0;

        while (m < errors) {
          resFinal.push(err[m] + ' at line ' + RR[m]);
          m++;
        }
        while (m < lines) {
          resFinal.push(result[RR[m]] + ' at line ' + RR[m]);
          m++;
        }
      }

      //console.log('\nFINAL RESULT\n', resFinal);

      FINAL_RESULT = {
        success: false,
        error: resFinal,
      };

      return FINAL_RESULT;
    } else if (!(404 in result)) {
      var resFinal = [];
      var len = RR.length;
      for (var w = 0; w < len; w++) {
        resFinal.push(result[RR[w]] + 'at line' + RR[w]);
      }
      FINAL_RESULT = {
        success: false,
        error: resFinal,
      };

      return FINAL_RESULT;
    }
  }

  //   //console.log(Object.values(result));

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

//Default error message: Error: Unexpected identifier at line x
