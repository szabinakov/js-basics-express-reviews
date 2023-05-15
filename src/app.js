const express = require('express');

const {
  sayHello,
  uppercase,
  lowercase,
  countCharacters,
  firstCharacter,
  firstCharacters,
} = require('./lib/strings');
const { add, subtract, multiply, divide, remainder } = require('./lib/numbers');
const { negate, truthiness, isOdd, startsWith } = require('./lib/booleans');
const {
  getNthElement,
  arrayToCSVString,
  addToArray2,
  elementsStartingWithAVowel,
  removeNthElement2,
} = require('./lib/arrays');

const app = express();
app.use(express.json());

app.get('/strings/hello/:string', (req, res) => {
  res.json({ result: sayHello(req.params.string) });
});

app.get('/strings/upper/:string', (req, res) => {
  res.json({ result: uppercase(req.params.string) });
});

app.get('/strings/lower/:string', (req, res) => {
  res.json({ result: lowercase(req.params.string) });
});

app.get('/strings/count-characters/:string', (req, res) => {
  res.json({ result: countCharacters(req.params.string) });
});

app.get('/strings/first-character/:string', (req, res) => {
  res.status(200).json({ result: firstCharacter(req.params.string) });
});

app.get('/strings/first-characters/:string', (req, res) => {
  const qlength = req.query.length;
  res.json({ result: firstCharacters(req.params.string, qlength) });
});

//  End of strings, start of numbers

app.get('/numbers/add/:firstNum/and/:secondNum', (req, res) => {
  const firstNumber = parseInt(req.params.firstNum, 10);
  const secondNumber = parseInt(req.params.secondNum, 10);
  const isNotANumber = Number.isNaN(firstNumber) || Number.isNaN(secondNumber);

  if (isNotANumber) {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  } else {
    res.json({ result: add(firstNumber, secondNumber) });
  }
});

app.get('/numbers/subtract/:firstNum/from/:secondNum', (req, res) => {
  const firstNumber = parseInt(req.params.firstNum, 10);
  const secondNumber = parseInt(req.params.secondNum, 10);
  const isNotANumber = Number.isNaN(firstNumber) || Number.isNaN(secondNumber);

  if (isNotANumber) {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  } else {
    res.json({ result: subtract(secondNumber, firstNumber) });
  }
});

app.post('/numbers/multiply', (req, res) => {
  const firstNumber = parseInt(req.body.a, 10);
  const secondNumber = parseInt(req.body.b, 10);
  const notEnoughParams = !req.body.a || !req.body.b;
  const isNotANumber = Number.isNaN(firstNumber) || Number.isNaN(secondNumber);

  if (notEnoughParams) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  } else if (isNotANumber) {
    res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  } else {
    res.status(200).json({ result: multiply(firstNumber, secondNumber) });
  }
});

app.post('/numbers/divide', (req, res) => {
  const firstNumber = parseInt(req.body.a, 10);
  const secondNumber = parseInt(req.body.b, 10);
  const firstParamIsZero = req.body.a === 0 || firstNumber === 0;
  const secondParamIsZero = req.body.b === 0 || secondNumber === 0;
  const notEnoughParams = !req.body.a || !req.body.b;
  const isNotANumber = Number.isNaN(firstNumber) || Number.isNaN(secondNumber);

  if (firstParamIsZero) {
    res.json({ result: 0 });
  } else if (secondParamIsZero) {
    res.status(400).json({ error: 'Unable to divide by 0.' });
  } else if (notEnoughParams) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  } else if (isNotANumber) {
    res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  } else {
    res.status(200).json({ result: divide(firstNumber, secondNumber) });
  }
});

app.post('/numbers/remainder', (req, res) => {
  const firstNumber = parseInt(req.body.a, 10);
  const secondNumber = parseInt(req.body.b, 10);
  const firstParamIsZero = req.body.a === 0 || firstNumber === 0;
  const secondParamIsZero = req.body.b === 0 || secondNumber === 0;
  const notEnoughParams = !req.body.a || !req.body.b;
  const isNotANumber = Number.isNaN(firstNumber) || Number.isNaN(secondNumber);

  if (firstParamIsZero) {
    res.json({ result: 0 });
  } else if (secondParamIsZero) {
    res.status(400).json({ error: 'Unable to divide by 0.' });
  } else if (notEnoughParams) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  } else if (isNotANumber) {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  } else {
    res.status(200).json({ result: remainder(firstNumber, secondNumber) });
  }
});

//  End of numbers, start of booleans

app.post('/booleans/negate', (req, res) => {
  res.status(200).json({ result: negate(req.body.value) });
});

app.post('/booleans/truthiness', (req, res) => {
  res.status(200).json({ result: truthiness(req.body.value) });
});

app.get('/booleans/is-odd/:number', (req, res) => {
  const paramNumber = parseInt(req.params.number, 10);
  const isNotNumber = Number.isNaN(paramNumber);

  if (isNotNumber) {
    res.status(400).json({ error: 'Parameter must be a number.' });
  } else {
    res.status(200).json({ result: isOdd(paramNumber) });
  }
});

app.get('/booleans/:string/starts-with/:character', (req, res) => {
  const paramCharacter = req.params.character;
  const paramString = req.params.string;

  if (paramCharacter.length > 1) {
    res.status(400).json({ error: 'Parameter "character" must be a single character.' });
  } else {
    res.status(200).json({ result: startsWith(paramCharacter, paramString) });
  }
});

//  End of booleans, start of arrays

app.post('/arrays/element-at-index/:index', (req, res) => {
  res.status(200).json({ result: getNthElement(req.params.index, req.body.array) });
});

app.post('/arrays/to-string', (req, res) => {
  res.status(200).json({ result: arrayToCSVString(req.body.array) });
});

app.post('/arrays/append', (req, res) => {
  res.status(200).json({ result: addToArray2(req.body.value, req.body.array) });
});

app.post('/arrays/starts-with-vowel', (req, res) => {
  res.status(200).json({ result: elementsStartingWithAVowel(req.body.array) });
});

app.post('/arrays/remove-first-element', (req, res) => {
  res.status(200).json({ result: req.body.array.slice(1, req.body.array.length + 1) });
});

app.post('/arrays/remove-element', (req, res) => {
  res.status(200).json({ result: removeNthElement2(req.query.index, req.body.array) });
});

module.exports = app;
