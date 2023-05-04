const createPerson = (name, age) => {
  const person = {
    name,
    age
  };
  return person;
};

const getName = object => {
  return object.name;
};

const getProperty = (property, object) => {
  return object[property];
};

const hasProperty = (property, object) => {
  return object.hasOwnProperty(property);
};

const isOver65 = person => {
  return person.age > 65;
};

const getAges = people => {
  return people.map(personAge => {
    return personAge.age;
  });
};

const findByName = (name, people) => {
  const result = people.find(person => person.name === name);
  return result;
};

const findHondas = cars => {
  const result = cars.filter(car => car.manufacturer === 'Honda');
  return result;
};

const averageAge = people => {
  const ageArray = people.map(personAge => {
    return personAge.age;
  });
  const totalAge = ageArray.reduce((acc, val) => {
    return acc + val;
  });
  return totalAge / people.length;
};

const createTalkingPerson = (name, age) => {
  const talkingPerson = {
    name,
    age,
    introduce(name2) {
      return `Hi ${name2}, my name is ${this.name} and I am ${this.age}!`;
    }
  };
  return talkingPerson;
};

module.exports = {
  createPerson,
  getName,
  getProperty,
  hasProperty,
  isOver65,
  getAges,
  findByName,
  findHondas,
  averageAge,
  createTalkingPerson
};
