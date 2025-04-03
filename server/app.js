const express = require('express');
// const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const auth = require('./auth');
const departments = require('./departments');

app.get('/api/auth', auth.list);

app.post('/api/auth/signin', auth.add);

app.post('/api/auth/signup', auth.list);

app.put('/api/auth/:id', auth.update);

app.delete('/api/auth/:id', auth.delete);

app.use(error);

app.listen(port, () => {
    console.log(`TODO APP Server listening  on port ${port}`)
});