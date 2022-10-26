const Employee = require("../models/employee.model");

// GET
exports.getAll = async (req, res) => {
    try {
        res.json(await Employee.find().populate('departmentID'))
    } catch (err) {
        res.status(500).json({message: err})
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Employee.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const employee = await Employee.findOne().skip(rand).populate('departmentID');
        if (!employee) res.status(404).json({message: 'Not found'});
        else res.json(employee);
    } catch (err) {
        res.status(500).json({message: err})
    }
};

exports.getById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate('departmentID');
        if(!employee) res.status(404).json({ message: 'Not found' });
        else res.json(employee);
    } catch (err) {
        res.status(500).json({message: err});
    }
};

// POST
exports.createEmployee = async (req, res) => {
    try {
        const { firstName, lastName, departmentID } = req.body;
        const newEmployee = new Employee({firstName, lastName, departmentID})
        await newEmployee.save()
        res.json(newEmployee)
    } catch (err) {
        res.status(500).json({message: err})
    }
};

// PUT
exports.updateEmployee = async (req, res) => {
    const { firstName, lastName, departmentID } = req.body;
    try {
        const employee = await Employee.findById(req.params.id);
        if (employee) {
            employee.firstName = firstName;
            employee.lastName = lastName;
            employee.departmentID = departmentID;
            await employee.save()
            res.json(employee);
        } else {
            res.status(404).json({message: 'Not found...'})
        }
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

// DELETE
exports.deleteEmployee = async (req, res) => {
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
};
