const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.model');

router.get('/employees', async (req, res) => {
  try {
    res.json(await Employee.find())
  } catch (err) {
    res.status(500).json({message: err})
  }
});

router.get('/employees/random', async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const employee = Employee.findOne().skip(rand);
    if (!employee) res.status(404).json({message: 'Not found'});
    else res.json(employee);
  } catch (err) {
    res.status(500).json({message: err})
  }
});

router.get('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if(!employee) res.status(404).json({ message: 'Not found' });
    else res.json(employee);
  } catch (err) {
    res.status(500).json({message: err});
  }
});

router.post('/employees', async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const newEmployee = new Employee({firstName, lastName, department})
    await newEmployee.save()
    res.json(newEmployee)
  } catch (err) {
    res.status(500).json({message: err})
  }
});

router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName, department } = req.body;
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      employee.firstName = firstName;
      employee.lastName = lastName;
      employee.department = department;
      await employee.save()
      res.json(employee);
    } else {
      res.status(404).json({message: 'Not found...'})
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if(employee){
      await employee.remove();
      res.json(employee);
    }
    else res.status(404).json({message: 'Not found...'})
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
