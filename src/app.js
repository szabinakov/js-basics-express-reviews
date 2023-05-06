const express = require('express');
// importing functions from the JS basics folders so we don't have to rewrite them
const { sayHello, uppercase, lowercase } = require('./lib/strings');
const { add, subtract, multiply, divide, remainder } = require('./lib/numbers');
const { negate, truthiness, startsWith } = require('./lib/booleans');
const { arrayToCSVString, addToArray2, elementsStartingWithAVowel } = require('./lib/arrays');

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

app.get('/strings/first-characters/hello', (req, res) => {
  const { string } = req.query;
  const firstChar = string ? string.charAt(0) : 'h';
  res.json({ result: firstChar });
});

app.get('/strings/first-characters/:string', (req, res) => {
  const { string } = req.params;
  const { length } = req.query;
  const firstChars = string.slice(0, length);
  res.json({ result: firstChars });
});

app.get('/numbers/add/:num1/and/:num2', (req, res) => {
  const num1 = parseInt(req.params.num1, 10);
  const num2 = parseInt(req.params.num2, 10);

  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    return res.status(400).json({ error: 'Parameters must be valid numbers.' });
  }
  return res.status(200).json({ result: add(num1, num2) });
});

app.get('/numbers/subtract/:num1/from/:num2', (req, res) => {
  const num1 = parseInt(req.params.num1, 10);
  const num2 = parseInt(req.params.num2, 10);

  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    return res.status(400).json({ error: 'Parameters must be valid numbers.' });
  }

  return res.status(200).json({ result: subtract(num2, num1) });
});

app.post('/numbers/multiply', (req, res) => {
  const { a } = req.body;
  const { b } = req.body;

  if (!a || !b) {
    return res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }

  if (Number.isNaN(parseInt(a)) || Number.isNaN(parseInt(b))) {
    return res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  }

  const result = multiply(a, b);

  return res.status(200).json({ result });
});

app.post('/numbers/divide', (req, res) => {
  const { a, b } = req.body;

  if (a === undefined || b === undefined) {
    return res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }

  const num1 = Number(a);
  const num2 = Number(b);

  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    return res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  }

  if (num2 === 0) {
    return res.status(400).json({ error: 'Unable to divide by 0.' });
  }

  return res.json({ result: divide(a, b) });
});

app.post('/numbers/remainder', (req, res) => {
  const { a, b } = req.body;

  if (a === undefined || b === undefined) {
    return res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }

  const num1 = Number(a);
  const num2 = Number(b);

  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    return res.status(400).json({ error: 'Parameters must be valid numbers.' });
  }

  if (num2 === 0) {
    return res.status(400).json({ error: 'Unable to divide by 0.' });
  }

  return res.json({ result: remainder(a, b) });
});

app.post('/booleans/negate', (req, res) => {
  const { value } = req.body;
  res.json({ result: negate(value) });
});

app.post('/booleans/truthiness', (req, res) => {
  const { value } = req.body;
  // eslint-disable-next-line no-constant-condition
  if (value == null || 0 || ' ') {
    return res.status(200).json({ result: truthiness(value) });
  }
  return res.status(200).json({ result: true });
});

app.get('/booleans/is-odd/:number', (req, res) => {
  const { number } = req.params;

  if (number % 2 === 1) {
    return res.status(200).json({ result: true });
  }

  if (number % 2 === 0) {
    return res.status(200).json({ result: false });
  }

  if (Number.isNaN(Number(number))) {
    return res.status(400).json({ error: 'Parameter must be a number.' });
  }
});

app.get('/booleans/:string/starts-with/:character', (req, res) => {
  const { character, string } = req.params;

  if (character.length !== 1) {
    return res.status(400).json({ error: 'Parameter "character" must be a single character.' });
  }

  return res.status(200).json({ result: startsWith(character, string) });
});

app.post('/arrays/element-at-index/:index', (req, res) => {
  const index = Number(req.params.index);
  const { array } = req.body;

  const element = array[index];
  res.status(200).json({ result: element });
});

app.post('/arrays/to-string', (req, res) => {
  const { array } = req.body;

  return res.status(200).json({ result: arrayToCSVString(array) });
});

app.post('/arrays/append', (req, res) => {
  const { value, array } = req.body;

  const newArray = addToArray2(value, array);

  return res.status(200).json({ result: newArray });
});

app.post('/arrays/starts-with-vowel', (req, res) => {
  const { array } = req.body;

  return res.status(200).json({ result: elementsStartingWithAVowel(array) });
});

app.post('/arrays/remove-element', (req, res) => {
  const { array } = req.body;
  const { index } = req.query;

  // remove element at given index
  if (index !== undefined) {
    array.splice(index, 1);
  } else {
    // remove first element if no index is given
    array.shift();
  }

  return res.status(200).json({ result: array });
});

module.exports = app;
