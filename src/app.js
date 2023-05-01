const express = require('express');
const {
  sayHello,
  uppercase,
  lowercase,
  firstCharacter,
  firstCharacters,
} = require('./lib/strings');

const { add, subtract, multiply, divide, remainder } = require('./lib/numbers');

const { negate, truthiness, isOdd, startsWith } = require('./lib/booleans');

const {
  getNthElement,
  arrayToCSVString,
  addToArray,
  elementsStartingWithAVowel,
  removeNthElement,
} = require('./lib/arrays');

const app = express();

app.use(express.json());

app.get('/strings/hello/:string', (req, res) => {
  res.status(200).send({ result: sayHello(req.params.string) });
});

app.get('/strings/upper/:string', (req, res) => {
  res.status(200).send({ result: uppercase(req.params.string) });
});

app.get('/strings/lower/:string', (req, res) => {
  res.status(200).send({ result: lowercase(req.params.string) });
});

app.get('/strings/first-characters/:string', (req, res) => {
  if (req.query.length) {
    res.status(200).send({ result: firstCharacters(req.params.string, req.query.length) });
  } else {
    res.status(200).send({ result: firstCharacter(req.params.string) });
  }
});

app.get('/numbers/add/:first/and/:second', (req, res) => {
  if (Number.isNaN(req.params.first) || Number.isNaN(req.params.second)) {
    res.status(400).send({ error: 'Parameters must be valid numbers.' });
  } else {
    res.status(200).send({ result: add(Number(req.params.first), Number(req.params.second)) });
  }
});

app.get('/numbers/subtract/:first/from/:second', (req, res) => {
  if (Number.isNaN(req.params.first) || Number.isNaN(req.params.second)) {
    res.status(400).send({ error: 'Parameters must be valid numbers.' });
  } else {
    res.status(200).send({ result: subtract(Number(req.params.second), Number(req.params.first)) });
  }
});

app.post('/numbers/multiply', (req, res) => {
  console.log(req.body);

  if (req.body.a == null || req.body.b == null) {
    res.status(400).send({ error: 'Parameters "a" and "b" are required.' });
  }

  if (Number.isNaN(req.body.a) || Number.isNaN(req.body.b)) {
    res.status(400).send({ error: 'Parameters "a" and "b" must be valid numbers.' });
  } else {
    res.status(200).data({ result: multiply(req.body.a, req.body.b) });
  }
});

app.post('/numbers/divide', (req, res) => {
  console.log(req.body);

  if (req.body.b === 0) {
    res.status(400).send({ error: 'Unable to divide by 0.' });
  }
  if (req.body.a == null || req.body.b == null) {
    res.status(400).send({ error: 'Parameters "a" and "b" are required.' });
  }
  if (Number.isNaN(req.body.a) || Number.isNaN(req.body.b)) {
    res.status(400).send({ error: 'Parameters "a" and "b" must be valid numbers.' });
  } else {
    res.status(200).send({ result: divide(req.body.a, req.body.b) });
  }
});

app.post('/numbers/remainder', (req, res) => {
  console.log(req.body);

  if (req.body.b === 0) {
    res.status(400).send({ error: 'Unable to divide by 0.' });
  }
  if (req.body.a == null || req.body.b == null) {
    res.status(400).send({ error: 'Parameters "a" and "b" are required.' });
  }
  if (Number.isNaN(req.body.a) || Number.isNaN(req.body.b)) {
    res.status(400).send({ error: 'Parameters must be valid numbers.' });
  } else {
    res.status(200).send({ result: remainder(req.body.a, req.body.b) });
  }
});

app.post('/booleans/negate', (req, res) => {
  console.log(req.body.value);
  res.status(200).send({ result: negate(req.body.value) });
});

app.post('/booleans/truthiness', (req, res) => {
  console.log(req.body.value);
  res.status(200).send({ result: truthiness(req.body.value) });
});

app.get('/booleans/is-odd/:value', (req, res) => {
  if (isNaN(req.params.value)) {
    res.status(400).send({ error: 'Parameter must be a number.' });
  }
  res.status(200).send({ result: isOdd(req.params.value) });
});

app.get('/booleans/:string/starts-with/:character', (req, res) => {
  if (req.params.character.length !== 1) {
    res.status(400).send({ error: 'Parameter "character" must be a single character.' });
  }
  res.status(200).send({ result: startsWith(req.params.character, req.params.string) });
});

app.post('/arrays/element-at-index/:index', (req, res) => {
  console.log(req.body.array);
  res.status(200).send({ result: getNthElement(req.params.index, req.body.array) });
});

app.post('/arrays/to-string', (req, res) => {
  console.log(req.body);
  res.status(200).send({ result: arrayToCSVString(req.body.array) });
});

app.post('/arrays/append', (req, res) => {
  console.log(req.body.array);
  addToArray(req.body.value, req.body.array);
  res.status(200).send({ result: req.body.array });
});

app.post('/arrays/starts-with-vowel', (req, res) => {
  console.log(req.body.array);
  res.status(200).send({ result: elementsStartingWithAVowel(req.body.array) });
});

app.post('/arrays/remove-element', (req, res) => {
  console.log(req.body.array);
  console.log(req.query.index);
  res.status(200).send({ result: removeNthElement(req.query.index, req.body.array) });
});

module.exports = app;
