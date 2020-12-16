const express = require("express");
var cors = require("cors");
var data = require("./data");

const app = express();

const port = process.env.PORT || 3002;

app.use(cors());

app.get('/', (req, res) => {
  res.send("Welcome to API");
})

app.get('/quizzes', (req, res) => {
  let metadata = data.quizzes.map(x => {
    return {id: x.id, title: x.title, picture: x.picture};
  });
  res.json(data.quizzes);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
