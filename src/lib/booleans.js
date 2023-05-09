function negate(a) {
  return !a;
};

function both(a, b) {
  return (a && b);

};

function either(a, b) {
  if (a == true | b == true) {

    return true;
  } else {

    return false;
  };
};

function none(a, b) {
  return negate(either(a, b));
};

function one(a, b) {
  if ((a == true | b == true) && a !== b) {
    return true;
  } else {
    return false;
  };
};

function truthiness(a) {
  if (a) {
    return true;
  } else {
    return false;
  };
};

function isEqual(a, b) {
  return a === b;
};

function isGreaterThan(a, b) {
  return a > b;
};

function isLessThanOrEqualTo(a, b) {
  return a <= b;
};

function isOdd(a) {
  if (a % 2 == 1) {
    return true;
  } else {
    return false;
  };
};

function isEven(a) {
  if (a % 2 == 0) {
    return true;
  } else {
    return false;
  };
};

function isSquare(a) {
  if (Number.isInteger(Math.sqrt(a)) == true) {
    return true;
  } else {
    return false;
  };
};

function startsWith(char, string) {
  if (string.charAt(0) == char) {
    return true;
  } else {
    return false;
  };
};

function containsVowels(string) {
  string = string.toLowerCase();
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  for (let i = 0; i < string.length; i++) {
    if (vowels.includes(string[i])) return true;
  }
  return false;
};


function isLowerCase(string) {
return string.toLowerCase() === string;
/*  const lowerString = string.toLowerCase(); 
  if (string == lowerString) {
  return true; 
  }
  return false;
  Both codes do the same thing. */
};

module.exports = {
  negate,
  both,
  either,
  none,
  one,
  truthiness,
  isEqual,
  isGreaterThan,
  isLessThanOrEqualTo,
  isOdd,
  isEven,
  isSquare,
  startsWith,
  containsVowels,
  isLowerCase
};
