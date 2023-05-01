const express = require('express');

const app = express();

app.use(express.json());

const {
  sayHello,
  uppercase,
  lowercase,
  firstCharacter,
  firstCharacters,
} = require('./lib/strings');

const { add, multiply, subtract, divide, remainder } = require('./lib/numbers');

const {
  getNthElement,
  arrayToCSVString,
  addToArray,
  elementsStartingWithAVowel,
  removeNthElement2,
} = require('./lib/arrays');

const { negate, truthiness, isOdd, startsWith } = require('./lib/booleans');

app.get('/strings/hello/:string', (req, res) => {
  res.json({ result: sayHello(req.params.string) });
});

app.get('/strings/upper/:string', (req, res) => {
  res.json({ result: uppercase(req.params.string) });
});

app.get('/strings/lower/:string', (req, res) => {
  res.json({ result: lowercase(req.params.string) });
});

app.get('/strings/first-characters/:string', (req, res) => {
  if (!req.query.length) {
    res.json({ result: firstCharacter(req.params.string) });
  } else {
    res.json({ result: firstCharacters(req.params.string, req.query.length) });
  }
});

app.get('/numbers/add/:num1/and/:num2', (req, res) => {
  const num1 = parseInt(req.params.num1, 10);
  const num2 = parseInt(req.params.num2, 10);
  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  } else {
    res.json({ result: add(num1, num2) });
  }
});

app.get('/numbers/subtract/:num1/from/:num2', (req, res) => {
  const num1 = parseInt(req.params.num1, 10);
  const num2 = parseInt(req.params.num2, 10);
  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  } else {
    res.status(200).json({ result: subtract(num2, num1) });
  }
});

app.post('/numbers/multiply/', (req, res) => {
  const { a, b } = req.body;
  if (a === undefined || b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  } else if (Number.isNaN(Number(a)) || Number.isNaN(Number(b))) {
    res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  } else {
    res.status(200).json({ result: multiply(a, b) });
  }
});

app.post('/numbers/divide', (req, res) => {
  const { a, b } = req.body;
  if (a === undefined || b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  } else if (Number.isNaN(Number(a)) || Number.isNaN(Number(b))) {
    res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  } else if (b === 0) {
    res.status(400).json({ error: 'Unable to divide by 0.' });
  } else {
    res.status(200).json({ result: divide(a, b) });
  }
});

app.post('/numbers/remainder', (req, res) => {
  const { a, b } = req.body;
  if (a === undefined || b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  } else if (Number.isNaN(Number(a)) || Number.isNaN(Number(b))) {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  } else if (b === 0) {
    res.status(400).json({ error: 'Unable to divide by 0.' });
  } else {
    res.status(200).json({ result: remainder(a, b) });
  }
});

app.post('/arrays/element-at-index/:index', (req, res) => {
  const { array } = req.body;
  const { index } = req.params;
  res.json({ result: getNthElement(index, array) });
});

app.post('/arrays/to-string', (req, res) => {
  const { array } = req.body;
  res.json({ result: arrayToCSVString(array) });
});

app.post('/arrays/append/', (req, res) => {
  const { array, value } = req.body;
  res.json({ result: addToArray(value, array) });
});

app.post('/arrays/starts-with-vowel', (req, res) => {
  const { array } = req.body;
  res.json({ result: elementsStartingWithAVowel(array) });
});

app.post('/arrays/remove-element', (req, res) => {
  const { array } = req.body;
  const { index } = req.query;
  res.json({ result: removeNthElement2(index, array) });
});

app.post('/arrays/remove-element', (req, res) => {
  const { array } = req.body;
  const { index } = req.query;
  res.json({ result: removeNthElement2(index, array) });
});

app.post('/booleans/negate', (req, res) => {
  const { value } = req.body;
  res.json({ result: negate(value) });
});

app.post('/booleans/truthiness', (req, res) => {
  const { value } = req.body;
  res.json({ result: truthiness(value) });
});

app.get('/booleans/is-odd/:num', (req, res) => {
  const { num } = req.params;
  if (Number.isNaN(Number(num))) {
    res.status(400).json({ error: 'Parameter must be a number.' });
  } else {
    res.json({ result: isOdd(num) });
  }
});
app.get('/booleans/:string/starts-with/:letter', (req, res) => {
  const { string, letter } = req.params;
  if (letter.length > 1) {
    res.status(400).json({ error: 'Parameter "character" must be a single character.' });
  }
  res.json({ result: startsWith(letter, string) });
});
module.exports = app;
