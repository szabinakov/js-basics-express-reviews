const express = require('express');
// importing functions from the JS basics folders so we don't have to rewrite them
const { sayHello } = require('./lib/strings');
const { add } = require('./lib/numbers');
const { uppercase } = require('./lib/strings');
const { lowercase } = require('./lib/strings');
const { subtract } = require('./lib/numbers');
const { multiply } = require('./lib/numbers');
const { divide } = require('./lib/numbers');
const { remainder } = require('./lib/numbers');
const { negate } = require('./lib/booleans');

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
  const negatedValue = !value;
  res.json({ result: negate(value) });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

module.exports = app;
