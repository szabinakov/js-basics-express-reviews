const express = require('express');
// importing functions from the JS basics folders so we don't have to rewrite them
const { sayHello } = require('./lib/strings');
const { add } = require('./lib/numbers');
const { uppercase } = require('./lib/strings');
const { lowercase } = require('./lib/strings');
const { subtract } = require('./lib/numbers');

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
  const { a, b } = req.body;
  const sum = parseInt(a) * parseInt(b);

  res.status(200).json({ result: sum });
});

app.post('/numbers/divide', (req, res) => {
  const { a, b } = req.body;
  const sum = parseInt(a) / parseInt(b);

  res.status(200).json({ result: sum });
});

app.post('/numbers/divide', (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  if (b === 0) {
    return res.status(200).json({ error: 'Unable to divide by 0.' });
  }

  const sum = a / b;
  res.status(200).json({ sum });
});

app.post('/numbers/remainder', (req, res) => {
  const { a, b } = req.body;
  const remainder = parseInt(a) % parseInt(b);

  res.status(200).json({ result: remainder });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

module.exports = app;
