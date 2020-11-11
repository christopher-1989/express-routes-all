const express = require('express');
const app = express();

// Serves Express Yourself website
app.use(express.static('public'));

const { getElementById, getIndexById, updateElement,
        seedElements, createElement } = require('./utils');

const expressions = [];
seedElements(expressions, 'expressions');
const animals = [];
seedElements(animals, 'animals');

const PORT = process.env.PORT || 4001;
// Use static server to serve the Express Yourself Website
app.use(express.static('public'));

app.get('/expressions', (req, res, next) => {
  res.send(expressions);
});

app.get('/expressions/:id', (req, res, next) => {
  const foundExpression = getElementById(req.params.id, expressions);
  if (foundExpression) {
    res.send(foundExpression);
  } else {
    res.status(404).send();
  }
});

app.put('/expressions/:id', (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    updateElement(req.params.id, req.query, expressions);
    res.send(expressions[expressionIndex]);
  } else {
    res.status(404).send();
  }
});

app.post('/expressions', (req, res, next) => {
  const receivedExpression = createElement('expressions', req.query);
  if (receivedExpression) {
    expressions.push(receivedExpression);
    res.status(201).send(receivedExpression);
  } else {
    res.status(400).send();
  }
});

app.delete('/expressions/:id', (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    expressions.splice(expressionIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.get('/animals', (req, res, next) => {
  res.send(animals);
})

app.get('/animals/:id', (req, res, next) => {
  const id = getIndexById(req.params.id, animals);
  if (id !== -1) {
    res.send(animals[id])
  } else {
    res.sendStatus(400);
  }
})

app.put('/animals/:id', (req, res, next) => {
  const id = getIndexById(req.params.id, animals);
  if (id !== -1) {
    animals[id].name = req.query.name;
    animals[id].emoji = req.query.emoji;
    res.send(animals[id])
  } else {
    res.sendStatus(404);
  }
})

app.post('/animals', (req, res, next) => {
  const newAnimal = createElement('animals', req.query);
  if (newAnimal) {
    animals.push(newAnimal)
    res.status(201).send(newAnimal)
  } else {
    res.sendStatus(400);
  }
})

app.delete('/animals/:id', (req, res, next) => {
  const id = getIndexById(req.params.id, animals);
  if (id !== -1) {
    animals.splice(id, 1);
    res.status(204).send(animals)
  } else {
    res.sendStatus(404);
  }
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`); 
});
