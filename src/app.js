const express = require('express');
const { sayHello } = require('./lib/strings');

const app = express();

app.get('/strings/hello/:string', (req, res) => {
  res.json({ result: sayHello(req.params.string) });
});

app.get('/strings/upper/:string', (req, res) => {
  res.json({ result: 'HELLO' });
});

app.get('/strings/lower/:string', (req, res) => {
  res.json({ result: 'hello' });
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
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);
  const sum = num1 + num2;
  console.log(req.params);
  res.status(200).json({ result: sum });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

module.exports = app;
