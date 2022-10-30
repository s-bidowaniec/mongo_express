const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const communication = require('./helpers/communication')
const app = express();

const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', employeesRoutes);
app.use('/api', departmentsRoutes);
app.use('/api', productsRoutes);
app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
})
// connects our backend code with the database
const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if(NODE_ENV === 'production') dbUri = 'url to remote db';
else if(NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/companyDBtest';
else dbUri = 'mongodb://localhost:27017/companyDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', ()=>{
  communication.log('Connected to the database');
})
db.on('err', err => {log(`Error:  ${err}`)})
const server = app.listen('8000', () => {
  communication.log('Server is running on port: 8000');
});
module.exports = server;
