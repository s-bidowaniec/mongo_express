const express = require('express');
const router = express.Router();
const {ObjectId} = require("mongodb");
const Product = require('../models/product.model');
const Department = require("../models/department.model");

router.get('/products', async (req, res) => {
  try {
    res.json(await Product.find())
  } catch (err) {
    res.status(500).json({message: err})
  }
});

router.get('/products/random', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const prod = Product.findOne().skip(rand);
    if (!prod) res.status(404).json({message: 'Not found'});
    else res.json(prod);
  } catch (err) {
    res.status(500).json({message: err})
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if(!prod) res.status(404).json({ message: 'Not found' });
    else res.json(prod);
  } catch (err) {
    res.status(500).json({message: err});
  }
});

router.post('/products', async (req, res) => {
  try {
    const { name, client } = req.body;
    const newProduct = new Product({name, client})
    await newProduct.save()
    res.json(newProduct)
  } catch (err) {
    res.status(500).json({message: err})
  }
});

router.put('/products/:id', async (req, res) => {
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
});

router.delete('/products/:id', async (req, res) => {
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
});

module.exports = router;
