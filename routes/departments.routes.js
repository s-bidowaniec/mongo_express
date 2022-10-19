const express = require('express');
const router = express.Router();
const {ObjectId} = require("mongodb");

router.get('/departments', (req, res) => {
  req.db.collection('departments').find().toArray((err, data) => {
    if (err) res.status(500).json({message:err});
    else res.json(data);
  })
});

router.get('/departments/random', (req, res) => {
  req.db.collection('depaartments').aggregate([{ $sample: {size: 1}}]).toArray((err, data)=>{
    if (err) res.status(500).json({message: err});
    else res.json(data[0]);
  })
});

router.get('/departments/:id', (req, res) => {
  req.db.collection('departments').findOne({_id: ObjectId(req.params.id)}, (err, data) => {
    if (err) res.status(500).json({message: err});
    else if (!data) res.status(404).json({message: 'Not found!'});
    else res.json(data);
  })
});

router.post('/departments', (req, res) => {
  const { name } = req.body;
  req.db.collection('departments').insertOne({name}, error => {
    if (error) res.json({message: 'Failure'});
    else res.json({message: 'OK'});
  })
});

router.put('/departments/:id', (req, res) => {
  const { name } = req.body;
  const id = ObjectId(req.params.id);
  req.db.collection('departments').updateOne({_id:id},{$set:{name}},error => {
    if (error) res.json({message: 'Failure'});
    else res.json({message: 'OK'});
  })
});

router.delete('/departments/:id', (req, res) => {
  const id = ObjectId(req.params.id);
  req.db.collection('departments').deleteOne({_id:id}, error => {
    if (error) res.json({message: 'Failure'});
    else res.json({message: 'OK'});
  })
});

module.exports = router;
