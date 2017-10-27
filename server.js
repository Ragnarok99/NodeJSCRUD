const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

let db;

MongoClient.connect(
  "mongodb://emmanuelv:emmanuelv@ds229835.mlab.com:29835/evercheck-test-ev",
  (err, database) => {
    if (err) return console.log(err);
    db = database;
    app.listen(3000, () => {
      console.log("listening on 3000");
    });
  }
);

const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true })); // middleware for extract request data form
app.use(bodyParser.raw());

app.get("/api/providers", (req, res) => {
  var cursor = db
    .collection("providers")
    .find()
    .sort({ _id: -1 })
    .toArray((err, results) => {
      res.send(results);
    });
});

app.post("/api/new_provider", (req, res) => {
  const body = req.body;

  if (typeof body !== "object" || Object.keys(body).length === 0) {
    return res
      .status(400)
      .send({
        message: "You must provide valid JSON and with least one property"
      });
  }
  db.collection("providers").insert(body, (err, result) => {
    if (err) return res.send({ message: err });

    res.status(201).send(result);
  });
});

app.delete("/api/remove_provider", (req, res) => {
  const id = req.body.id;
  try {
    db.collection("providers").remove({ _id: ObjectId(id) }, (err, result) => {
      if (result.result.n === 0) {
        return res.status(404).send({});
      }
      res.send(result);
    });
  } catch (errr) {
    res.status(400).send({ message: "Invalid data, " + errr });
  }
});

app.put("/api/update_provider", (req, res) => {
  const id = req.body.id;
  const item = req.body;
  delete item.id;

  try {
    db
      .collection("providers")
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: item },
        (err, result) => {
          if (err) return res.send(err);
          res.send(result);
        }
      );
  } catch (errr) {
    res.status(400).send({ message: "something went wrong, " + errr });
  }
});
