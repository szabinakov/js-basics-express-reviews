const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};

const power = (a, b) => {
  return a ** b;
};

function round (a) {

  return Math.round(a);
};

function roundUp (a) {
  
  return Math.ceil(a);
};

function roundDown (a) {

  return Math.floor(a);

};

function absolute (a) {
  return Math.abs(a);
};

const quotient = (a, b) => {
  return Math.trunc(a / b); 
};

const remainder = (a, b) => {
  return a % b;
};

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  power,
  round,
  roundUp,
  roundDown,
  absolute,
  quotient,
  remainder
}
