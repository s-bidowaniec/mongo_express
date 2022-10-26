const Department = require("../models/department.model");

// GET
exports.getAll = async (req, res) => {
    try {
        res.json(await Department.find())
    } catch (err) {
        res.status(500).json({message: err})
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Department.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const dep = await Department.findOne().skip(rand);
        if (!dep) res.status(404).json({message: 'Not found'});
        else res.json(dep);
    } catch (err) {
        res.status(500).json({message: err})
    }
};

exports.getById = async (req, res) => {
    try {
        const dep = await Department.findById(req.params.id);
        if(!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    } catch (err) {
        res.status(500).json({message: err});
    }
};

// POST
exports.createDepartment = async (req, res) => {
    try {
        const { name } = req.body;
        const newDepartment = new Department({name})
        await newDepartment.save()
        res.json(newDepartment)
    } catch (err) {
        res.status(500).json({message: err})
    }
};
 // PUT
exports.updateDepartment = async (req, res) => {
    const { name } = req.body;
    try {
        const dep = await Department.findById(req.params.id);
        if (dep) {
            dep.name = name;
            await dep.save()
            res.json(dep);
        } else {
            res.status(404).json({message: 'Not found...'})
        }
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

// DELETE
exports.deleteDepartment = async (req, res) => {
    try {
        const dep = await Department.findById(req.params.id);
        if(dep){
            await dep.remove();
            res.json(dep);
        }
        else res.status(404).json({message: 'Not found...'})
    } catch(err) {
        res.status(500).json({ message: err });
    }
};
