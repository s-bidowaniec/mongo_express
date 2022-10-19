const express = require('express');
const router = express.Router();
const {ObjectId} = require("mongodb");

router.get('/products', (req, res) => {
  req.db.collection('products').find().toArray((err, data) => {
    if (err) res.status(500).json({message:err});
    else res.json(data);
  })
});

router.get('/products/random', (req, res) => {
  req.db.collection('products').aggregate([{ $sample: {size: 1}}]).toArray((err, data)=>{
    if (err) res.status(500).json({message: err});
    else res.json(data[0]);
  })
});

router.get('/products/:id', (req, res) => {
  const id = ObjectId(req.params.id);
  req.db.collection('products').findOne({_id: id}, (err, data) => {
    if (err) res.status(500).json({message: err});
    else if (!data) res.status(404).json({message: 'Not found!'});
    else res.json(data);
  })
});

router.post('/products', (req, res) => {
  const { name, client } = req.body;
  req.db.collection('products').insertOne({ name, client }, error => {
    if (error) res.json({message: 'Failure'});
    else res.json({message: 'OK'});
  })
});

router.put('/products/:id', (req, res) => {
  const { name, client } = req.body;
  const id = ObjectId(req.params.id);
  req.db.collection('products').updateOne({_id:id}, {$set:{ name, client }}, error => {
    if (error) res.json({message: 'Failure'});
    else res.json({message: 'OK'});
  })
});

router.delete('/products/:id', (req, res) => {
  const id = ObjectId(req.params.id);
  req.db.collection('products').deleteOne({_id:id}, error => {
    if (error) res.json({message: 'Failure'});
    else res.json({message: 'OK'});
  })
});

module.exports = router;
