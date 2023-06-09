const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let forest = [];
let lastUpdateTime = Date.now();

app.post('/arrivals', (req, res) => {
  const color = req.body.color;

  if (!color) {
    res.status(400).json({ error: 'Invalid input. Please provide a color.' });
  } else {
      const currentTime = new Date().toISOString();
      const newTree = {color: color, time: currentTime};
      forest.push(newTree);
      lastUpdateTime = Date.now();
      console.log(`Received color: ${color} at ${currentTime}. Added a new ${color} tree to the forest.`);

      res.status(200).json({ message: `Color received at ${currentTime}.`, color: color, tree: newTree });
  }
});

app.get('/forest', (req, res) => {
  res.json(forest);
});

app.get('/forest/new', (req, res) => {
  const clientTimeInMs = Number(req.query.time);

  if (!clientTimeInMs) {
    res.json([]);
  } else {
    console.log(`clientTimeInMs: ${clientTimeInMs}`);

    const newTrees = forest.filter(tree => {
      const treeTimeInMs = new Date(tree.time).getTime();
      return treeTimeInMs > clientTimeInMs;
    });

    res.json(newTrees);
  }
});

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
