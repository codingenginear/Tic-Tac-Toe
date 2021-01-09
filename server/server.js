const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const uniqid = require('uniqid');
const PORT = process.env.PORT || 8090;
const gamesFilePath = './games.json';

const readGamesFile = () => {
  const Data = fs.readFileSync(gamesFilePath);
  const parsedData = JSON.parse(Data);
  return parsedData;
}

const writeGamesFiles = (newGameObj) => {
  fs.writeFileSync(gamesFilePath, JSON.stringify(newGameObj));
}

function Game(playerX, playerO) {
  this.id= uniqid();
  this.playerX = playerX;
  this.playerO = playerO;
  this.results = "none";
  this.timestamp = Date.now();
}


app.use(cors());
app.use(express.json());

app.get('/games', (_req, res) => {
  res.send(readGamesFile())
})

app.post('/games', (req, res) => {
  const { playerX, playerO } = req.body;
  const newGame = new Game(playerX, playerO);
  const data = readGamesFile();
  data.push(newGame);
  writeGamesFiles(data)
  res.send(newGame);
})

app.put("/games/:gameId", (req, res) => {
  const data = readGamesFile();
  const updatedGames = data.map((game) => {
    if (game.id === req.params.gameId) {
      game.results = req.body.results;
    }
    return game;
  });
  console.log(updatedGames);
  writeGamesFiles(updatedGames);
  res.send(updatedGames);
});

app.delete('/games/:gameId', (req, res) => {
  console.log(req.params.gameId)
  res.send('you have deleted a new game')
})



app.listen(PORT, () => {
  console.log('Listening on port ', PORT)
})