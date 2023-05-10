const express = require('express');
const { sayHello, uppercase, lowercase, firstCharacter, firstCharacters } = require('./lib/strings');


const app = express();

app.use(express.json());

app.get('/strings/hello/:string', (req, res) => {
  res.status(200).json({ result: sayHello(req.params.string) });
});

app.get('/strings/upper/:string', (req, res) => {
  res.status(200).json({ result: uppercase(req.params.string) });
});

app.get('/strings/lower/:string', (req, res) => {
  res.status(200).json({ result: lowercase(req.params.string) });
});

app.get('/strings/first-characters/:string', (req, res) => {
  const length = req.query.length;
  if (length) {
    res.status(200).json({ result: firstCharacters(req.params.string, length)})
 }
 else {
    res.status(200).json({ result: firstCharacter(req.params.string) });
 }
});

module.exports = app;
