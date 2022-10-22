const Product = require("../models/product.model");

// GET
exports.getAll = async (req, res) => {
    try {
        res.json(await Product.find())
    } catch (err) {
        res.status(500).json({message: err})
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Product.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const prod = Product.findOne().skip(rand);
        if (!prod) res.status(404).json({message: 'Not found'});
        else res.json(prod);
    } catch (err) {
        res.status(500).json({message: err})
    }
};

exports.getById = async (req, res) => {
    try {
        const prod = await Product.findById(req.params.id);
        if(!prod) res.status(404).json({ message: 'Not found' });
        else res.json(prod);
    } catch (err) {
        res.status(500).json({message: err});
    }
};

// POST
exports.createProduct = async (req, res) => {
    try {
        const { name, client } = req.body;
        const newProduct = new Product({name, client})
        await newProduct.save()
        res.json(newProduct)
    } catch (err) {
        res.status(500).json({message: err})
    }
};

// PUT
exports.updateProduct = async (req, res) => {
    const { name, client } = req.body;
    try {
        const prod = await Product.findById(req.params.id);
        if (prod) {
            prod.name = name;
            prod.client = client;
            await prod.save()
            res.json(prod);
        } else {
            res.status(404).json({message: 'Not found...'})
        }
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

// DELETE
exports.deleteProduct = async (req, res) => {
    try {
        const prod = await Product.findById(req.params.id);
        if(prod){
            await prod.remove();
            res.json(prod);
        }
        else res.status(404).json({message: 'Not found...'})
    } catch(err) {
        res.status(500).json({ message: err });
    }
};
