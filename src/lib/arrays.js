const getNthElement = (index, array) => {
  const index2 = index - array.length;

  if (index >= array.length) {
    return array[index2];
  }
  return array[index];
};

const arrayToCSVString = array => {
  return array.toString();
};

const csvStringToArray = string => {
  return string.split(',');
};

const addToArray = (element, array) => {
  array.push(element);
};

const addToArray2 = (element, array) => {
  return array.concat([element]);
};

const removeNthElement = (index, array) => {
  return array.splice(index, 1);
};

const numbersToStrings = numbers => {
  const numberString = numbers.map(number => {
    return number.toString();
  });
  return numberString;
};

const uppercaseWordsInArray = strings => {
  const uppercaseWords = strings.map(word => {
    return word.toUpperCase();
  });
  return uppercaseWords;
};

const reverseWordsInArray = strings => {
  const stringsToArrays = strings.map(element => {
    return element.split('').reverse();
  });
  const backToStrings = stringsToArrays.map(arrayElement => {
    return arrayElement.toString().replaceAll(',', '');
  });
  return backToStrings;
};

const onlyEven = numbers => {
  const evenNumbers = numbers.filter(number => {
    return number % 2 === 0;
  });
  return evenNumbers;
};

const removeNthElement2 = (index, array) => {
  const firstHalf = array.slice(0, index);
  const secondHalf = array.slice(-1);
  return firstHalf.concat(secondHalf);
};

const elementsStartingWithAVowel = strings => {
  const firstLetter = strings.filter(
    string =>
      string.toLowerCase().startsWith('a') ||
      string.toLowerCase().startsWith('e') ||
      string.toLowerCase().startsWith('i') ||
      string.toLowerCase().startsWith('o') ||
      string.toLowerCase().startsWith('u'),
  );
  return firstLetter;
};

const removeSpaces = string => {
  return string.replaceAll(' ', '');
};

const sumNumbers = numbers => {
  const sum = numbers.reduce((acc, number) => {
    return acc + number;
  });
  return sum;
};

const sortByLastLetter = strings => {
  const stringsToArrays2 = strings.map(element => {
    return Array.from(element)
      .reverse()
      .join('');
  });
  const arraysSorted = stringsToArrays2.sort();
  const finalArray = arraysSorted.map(sortedArr => {
    return sortedArr
      .split('')
      .reverse()
      .toString()
      .replaceAll(',', '');
  });
  return finalArray;
};

module.exports = {
  getNthElement,
  arrayToCSVString,
  csvStringToArray,
  addToArray,
  addToArray2,
  removeNthElement,
  numbersToStrings,
  uppercaseWordsInArray,
  reverseWordsInArray,
  onlyEven,
  removeNthElement2,
  elementsStartingWithAVowel,
  removeSpaces,
  sumNumbers,
  sortByLastLetter,
};
