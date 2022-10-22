const express = require('express');
const router = express.Router();
const EmployeeControler = require('../controllers/employees.controller')

router.get('/employees', EmployeeControler.getAll);

router.get('/employees/random', EmployeeControler.getRandom);

router.get('/employees/:id', EmployeeControler.getById);

router.post('/employees', EmployeeControler.createEmployee);

router.put('/employees/:id', EmployeeControler.updateEmployee);

router.delete('/employees/:id', EmployeeControler.deleteEmployee);

module.exports = router;
