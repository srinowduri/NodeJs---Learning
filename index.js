const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const app = express();
const log = require('./logger');
const auth = require('./authenticate');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));

app.use(log);
app.use(auth);

const persons = [
    {id: 1, name:'abc'},
    {id: 2, name:'def'},
    {id: 3, name:'ksjd'}
]
app.get('/', (request, response) => {
    response.send('Hi!! Good Morning');
});

app.get('/api/persons', (request, response) => {
    response.send(persons);
});

app.post('/api/persons', (request, response) => {
    if(!request.body.name || request.body.name < 1) {
        // 400 bad request
        response.status(400).send('Name is reqired and should be in minimum 1 characters.');
        return;
    }

    const person = {
        id: persons.length + 1,
        name: request.body.name
    };
    persons.push(person);
    response.send(person);
});

app.get('/api/persons/:id', (request, response) => {
    const person = persons.find(p => p.id === parseInt(request.params.id));
    if(!person){
        response.status(404).send('The person given with the ID was not found');
    }
    response.send(person);
});

app.put('/api/persons/:id', (request, response) => {
    const person = persons.find(p => p.id === parseInt(request.params.id));
    if(!person){
        response.status(404).send('The person given with the ID was not found');
    }

    if(!request.body.name || request.body.name < 1) {
        // 400 bad request
        response.status(400).send('Name is reqired and should be in minimum 3 characters.');
        return;
    }

    person.name = request.body.name;
    response.send(person);
});

app.delete('/api/persons/:id', (request, response) => {
    const person = persons.find(p => p.id === parseInt(request.params.id));
    if(!person){
        response.status(404).send('The person given with the ID was not found');
    }

    const index = persons.indexOf(person);
    persons.splice(index, 1);

    response.send(person);
});

app.listen(3003, () => console.log("Listening on port no:3003....."));

