const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var data = require("./data");

const app = express();

const port = process.env.PORT || 3002;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Welcome to Image Quiz API");
})

app.get('/quizzes', (req, res) => {
  let metadata = data.quizzes.map(x => {
    return {id: x.id, title: x.title, picture: x.picture};
  });
  res.json(metadata);
});

app.get('/quiz/:id', (req, res) => {
  let reqId = req.params.id;
  let found = data.quizzes.find(x => x.id === Number(reqId));
  if (found) {
    res.json(found.questions);
  }
  else {
    res.status(404).json({error: `The quiz with id ${reqId} was not found.`});
  }
});

app.post('/score', (req, res) => {
  let username = req.body.username;
  let quizid = req.body.quizid;
  let score = req.body.score;
  data.scores.push({score: score, quizid: quizid, username: username});
  res.json({message: `The score was added successfully.`});
})

app.listen(port, () => {
  console.log(`Image Quiz API listening on port ${port}!`)
});
