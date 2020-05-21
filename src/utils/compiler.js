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
    'Error in smart contract code: class (Contract) declaration missing or invalid',

  'def __init__(self):':
    'Error in smart contract code: constructor initialization missing or invalid or `self` parameter is not provided',

  'def __init__(self, name):':
    'Error in smart contract code: constructor initialization requires a `name & self` parameter',

  'self.init(name = name)':
    'Error in smart contract code: name initialization is missing/invalid in contract storage',

  'self.init(name = "peashooter")':
    'Error in smart contract code: name initialization is missing or is invalid in contract storage',

  pass:
    'Error in smart contract code: cannot have an empty function (add `pass`)',

  '@sp.add_test(name = "Test Plant Contract")':
    'Error in testing code: @sp.add_test decorator missing or invalid',

  'def test():': 'Error in testing code: test function declaration error',

  'scenario = sp.test_scenario()':
    'Error in testing code: invalid or missing test scenario declaration',

  'plant_test_contract = Plant()':
    'Error in testing code: invalid or missing Plant class invokation',

  'scenario += plant_test_contract':
    'Error in testing code: invalid or missing plant_test_contract assignment to scenario',

  '@sp.entry_point':
    'Error in smart contract code: @sp.entry_point decorator missing or invalid',

  'def change_name(self, new_name):':
    'Error in smart contract code: change_name function declaration error',

  'self.data.name = new_name':
    'Error in smart contract code: invalid or missing new_name assignment to self.data.name',

  'scenario += plant_test_contract.change_name("punky peashooter")':
    'Error in testing code: invalid or missing change_name test call',

  'def __init__(self, life_state):':
    'Error in smart contract code: constructor initialization require a `self` and `life_state` parameter',

  'is_alive = life_state':
    'Error in smart contract code: invalid or missing is_alive assignment',

  'plant_test_contract =  Plant(life_state = True)':
    'Error in testing code: life_state is missing or invalid in Plant invocation',

  'scenario.verify(plant_test_contract.data.is_alive == True)':
    'Error in testing code: invalid or missing scenario.verify helper method call',

  //******************/
  //For chapter 10

  'coordinate_x = sp.int(0),':
    'Error in smart contract code: coordinate_x of type `sp.TInt` variable initialization is missing or invalid in contract storage',

  'coordinate_y = sp.nat(0)':
    'Error in smart contract code: coordinate_y of type `sp.TNat` variable initialization is missing or invalid in contract storage',

  'def move_horizontally(self, update_to):':
    'Error in smart contract code: move_horizontally function declaration error',

  'self.data.coordinate_x += update_to':
    'Error in smart contract code: invalid or missing coordinate_x assignment',

  'def move_vertically(self, update_to):':
    'Error in smart contract code: move_vertically function declaration error',

  'self.data.coordinate_y += update_to':
    'Error in smart contract code: invalid or missing coordinate_y assignment',

  'scenario += plant_test_contract.move_horizontally(2)':
    'Error in testing code: invalid or missing move_horizontally test call',

  'scenario += plant_test_contract.move_vertically(1)':
    'Error in testing code: invalid or missing move_vertically test call',

  //******************/
  //For chapter 11
  'bullet_seed_count = 5,':
    'Error with smart contract code: invalid or missing bullet_seed_count variable init. in contract storage',

  'record_zombie_kills = {"simple_zombie":sp.nat(0), "boss_zombie":sp.nat(0)}':
    'Error with smart contract code: invalid or missing record_zombie_kills variable init. in contract storage',

  'self.data.bullet_seed_count -= 1':
    'Error with smart contract code: invalid or missing bullet_seed_count usage in shoot_zombie entry point function scope',

  'self.data.record_zombie_kills[zombie_type] += 1':
    'Error with smart contract code: invalid or missing record_zombie_kills usage in shoot_zombie entry point function scope',

  'scenario += plant_test_contract.shoot_zombie("simple_zombie")':
    'Error with testing code: invalid or missing shoot_zombie test call to kill "simple_zombie"',

  'scenario += plant_test_contract.shoot_zombie("boss_zombie")':
    'Error with testing code: invalid or missing shoot_zombie test call to kill "boss_zombie"',

  //******************/
  //For chapter 12
  'def __init__(self, life_state, manager_address):':
    'Error with smart contract code: constructor initialization require a `self`, `life_state` and `manager_address` function parameters',

  'plant_manager = manager_address,':
    'Error with smart contract code: plant_manager variable initialization is missing/invalid in contract storage',

  'my_address = sp.address("tz1Syu3KacZ8cy4286a4vaCeoMtwqVKHkaoj")':
    'Error with smart contract code: my_address of type `sp.TAddress` assignment is missing or is invalid',

  'plant_test_contract =  Plant(life_state = True, manager_address = my_address)':
    'Error with testing code: manager_address key missing or invaild in Plant invokation call',

  //For chapter 13
  'sp.verify(self.data.plant_manager == sp.sender, message = "Error: you are not the manager of this plant")':
    'Error with smart contract code: invalid or missing sp.verify method call',

  'scenario += plant_test_contract.shoot_zombie("simple_zombie").run(sender = my_address)':
    'Error with testing code: invalid or missing shoot_zombie call test call with my_address as caller',

  'scenario += plant_test_contract.shoot_zombie("boss_zombie").run(sender = my_address)':
    'Error with testing code: invalid or missing shoot_zombie call test call with my_address as caller',

  //For chapter 14
  'sp.else:': 'Error in smart contract code: missing of invalid sp.else block',

  'sp.failwith("Error: you ran out of bullets! Please buy more!")':
    'Error in smart contract code: invalid or missing sp.failwith helper method call in sp.else block',

  'sp.if self.data.bullet_seed_count >= 1:':
    'Error in smart contract code: invalid or missing sp.if block initialization',

  //chapter 2
  'name_of_currency_on_tezos_blockchain = "XTZ"':
    'Invalid or missing name_of_currency_on_tezos_blockchain assignment',
};

//-----Function to check user code and return error as object type {`line number`: `error message`}-----//
/**
 * matches a line-feed (newline) character (ASCII 10)
 * @param {*} code
 */
const SplitIntoNewLine = code => {
  return code.split('\n');
};

/**
 * matches a carriage return (ASCII 13)
 * @param {*} code
 */
const removeCarriageReturn = code => {
  return code.map(currentLine => currentLine.replace('\r', ''));
};

/**
 * Ignore semi colons
 * @param {*} code
 */
const ignoreSemiColons = code => {
  return code.map(currentLine => currentLine.replace(';', ''));
};
/**
 * Replace tab with space
 * @param {*} code
 */
const replaceTabWithSpace = code => {
  return code.map(currentLine => currentLine.replace('\t', '  '));
};

/**
 * Removing extra spaces from the end of line
 * @param {*} code
 */
const trimAtTheEndOfLine = code => {
  return code.map(currentLine => currentLine.trimRight());
};

/**
 * Replace single quotes(') with double quotes("")
 * @param {*} code
 */
const replaceSingleQuotesWithDoubleQuotes = code => {
  return code.map(currentLine => currentLine.split(`'`).join(`"`));
};

/**
 * removing valid python comments starting with #
 * @param {*} code
 */
const removeComments = code => {
  return code.filter(currentLine => currentLine.trim()[0] !== '#');
};

const ignoreEmptyNewLines = code => {
  return code.filter(currentLine => currentLine.trim() !== '');
};

const pipe = (arrayOfFunctions, value) => {
  return arrayOfFunctions.reduce((accumulator, currentFunc) => {
    return currentFunc(accumulator);
  }, value);
};

const mapArrayToObject = code => {
  const obj = {};
  for (const currentLine of code) {
    obj[currentLine] = currentLine;
  }
  return obj;
};

/**
 *
 * @param {*} userInputtedCode - user input value
 * @param {*} correctSolution - current chapter solution
 * @returns {*} {
 *  success: true/false,
 *  error: array of errors
 * }
 */
export function checkCode(userInputtedCode, correctSolution) {
  const result = {};

  const filteredUserInputtedCode = pipe(
    [
      SplitIntoNewLine,
      removeCarriageReturn,
      ignoreSemiColons,
      replaceTabWithSpace,
      trimAtTheEndOfLine,
      replaceSingleQuotesWithDoubleQuotes,
      removeComments,
      ignoreEmptyNewLines,
    ],
    userInputtedCode,
  );

  console.log('filteredUserInputtedCode', filteredUserInputtedCode);

  const userArray = mapArrayToObject(filteredUserInputtedCode);

  console.log('userArray', userArray);

  const filteredCorrectSolution = pipe(
    [SplitIntoNewLine, removeComments, ignoreEmptyNewLines],
    correctSolution,
  );
  console.log('filteredCorrectSolution', filteredCorrectSolution);

  const correctCodeArray = mapArrayToObject(filteredCorrectSolution);

  console.log('correctCodeArray', correctCodeArray);
  // list of lines (code) that user didn't write
  // var missingFromUser = correctCodeArray.filter(w => !userArray.includes(w));
  var missingFromUser = []; // it has code without space
  //Indentation message which will be shown to the user
  const INDENTATION_ERROR = 'Indentation Error';
  for (const a in correctCodeArray) {
    if (userArray[a] === undefined) {
      // this is for checking if indentation error is present or not
      // trim out all user inputted line[key + value] for checking if
      const userTrimmed = {};
      for (const x in userArray) {
        const key = x.trim();
        const value = userArray[x].trim();
        userTrimmed[key] = value;
      }
      // trim correct code line for comparison with user code
      const correctCodeTrimmed = a.trim();
      //user code matched with correct answer code
      //means error type is indentation error
      if (userTrimmed[correctCodeTrimmed]) {
        missingFromUser.push(INDENTATION_ERROR);
        continue;
      }
      missingFromUser.push(a);
    } else {
      continue;
    }
  }

  console.log('missingFromUser', missingFromUser);

  // list of extra lines (code) thats user wrote
  // var extraInUser = userArray.filter(w => !correctCodeArray.includes(w));
  //store very line which doesn't match with code solution
  var extraInUser = []; // it has code without space
  for (const a in userArray) {
    if (correctCodeArray[a] === undefined) {
      extraInUser.push(a);
    } else {
      continue;
    }
  }

  console.log('extraInUser', extraInUser);

  // invalid statements of extra line of codes
  for (const i in extraInUser) {
    if (extraInUser[i].trim() === 'pass') {
      result[filteredUserInputtedCode.indexOf(userArray[extraInUser[i]]) + 1] =
        // result[user.indexOf(extraInUser[i]) + 1] =
        'Invalid statement, remove `pass and update the function with appropriate statement`';
      //console.log("RESULT", result);
    } else {
      result[
        SplitIntoNewLine(userInputtedCode).indexOf(userArray[extraInUser[i]]) +
          1
      ] = 'Invalid statement';
      // result[user.indexOf(extraInUser[i]) + 1] = 'Invalid statement';
    }
  }
  console.log('RESULT_-2-', result);
  console.log('missingFromUser.length', missingFromUser.length);

  if (missingFromUser.length !== 0) {
    result[404] = [];
    for (const i in missingFromUser) {
      //check error type
      if (missingFromUser[i] === INDENTATION_ERROR) {
        result[404].push(missingFromUser[i]);
      } else {
        result[404].push(missing[correctCodeArray[missingFromUser[i]].trim()]);
      }
      // result[404].push(missing[missingFromUser[i].trim()]);
    }
  }
  console.log('RESULT-3', result);
  //console.log(i, j);

  //console.log('RESULT', result);

  var FINAL_RESULT = {
    success: null,
    error: null,
  };

  var RR = Object.keys(result);
  //console.log('RR', RR);
  console.log('RR', RR);

  if (RR.length === 0) {
    FINAL_RESULT = {
      success: true,
      error: [''],
    };

    return FINAL_RESULT;
  } else {
    if (404 in result) {
      RR = RR.filter(function(value) {
        console.log('RR=Value', value);
        return value < 404;
      });

      console.log('filtered RR', RR);

      var err = result[404];

      var lines = RR.length;
      console.log('lines', lines);
      var errors = err.length;
      console.log('errors', errors);

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
}

//Default error message: Error: Unexpected identifier at line x
