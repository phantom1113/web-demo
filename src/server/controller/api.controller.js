require('dotenv').config()
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const Issue = require('../model/issue');

let dbo;
MongoClient.connect(
  process.env.MongoURL,
  (err, db) => {
    if (err) throw err;
    dbo = db.db("Demo-express");
    console.log("Connection is sucessfull.");
  }
);

module.exports.index = (req, res) => {
  const filter = {};
  if(req.query.status) filter.status = req.query.status;
  dbo
    .collection("issueTracker")
    .find(filter)
    .toArray()
    .then(issues => {
      const metadata = { total_count: issues.length };
      res.json({ _metadata: metadata, records: issues });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
};

module.exports.postIssue = (req, res) => {
  console.log(req.body);
  const newIssue = req.body;
  newIssue.created = new Date();
  if (!newIssue.status) newIssue.status = "New";
  const err = Issue.validateIssue(newIssue)
  if(err){
    res.status(422).json({message: 'Invalid request: ${err}'});
    return;
  }
  dbo
    .collection('issueTracker')
    .insertOne(newIssue)
    .then(result =>
      dbo
        .collection('issueTracker')
        .find({ _id: result.insertedId })
        .limit(1)
        .next()
    )
    .then(newIssue => {
      res.json(newIssue)
    })
    .catch(err => {
      res.status(500).json({ message: 'Internal Server Error: ${err}' });
    })
};