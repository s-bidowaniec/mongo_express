const express = require('express');
const router = express.Router();
const {ObjectId} = require("mongodb");

router.get('/employees', (req, res) => {
  req.db.collection('employees').find().toArray((err, data) => {
    if (err) res.status(500).json({message:err});
    else res.json(data);
  })
});

router.get('/employees/random', (req, res) => {
  req.db.collection('employees').aggregate([{ $sample: {size: 1}}]).toArray((err, data)=>{
    if (err) res.status(500).json({message: err});
    else res.json(data[0]);
  })
});

router.get('/employees/:id', (req, res) => {
  const id = ObjectId(req.params.id);
  req.db.collection('employees').findOne({_id: id}, (err, data) => {
    if (err) res.status(500).json({message: err});
    else if (!data) res.status(404).json({message: 'Not found!'});
    else res.json(data);
  })
});

router.post('/employees', (req, res) => {
  const { firstName, lastName } = req.body;
  req.db.collection('employees').insertOne({firstName, lastName}, error => {
    if (error) res.json({message: 'Failure'});
    else res.json({message: 'OK'});
  })
});

router.put('/employees/:id', (req, res) => {
  const { firstName, lastName } = req.body;
  const id = ObjectId(req.params.id);
  req.db.collection('employees').updateOne({_id:id}, {$set:{firstName, lastName}}, error => {
    if (error) res.json({message: 'Failure'});
    else res.json({message: 'OK'});
  })
});

router.delete('/employees/:id', (req, res) => {
  const id = ObjectId(req.params.id);
  req.db.collection('employees').deleteOne({_id:id}, error => {
    if (error) res.json({message: 'Failure'});
    else res.json({message: 'OK'});
  })
});

module.exports = router;
