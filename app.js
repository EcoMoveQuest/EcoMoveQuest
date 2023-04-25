const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let forest = [];

function colorNameToHex(color) {
  const colorMap = {
    red: '#FF0000',
    green: '#008000',
    blue: '#0000FF',
    yellow: '#FFFF00',
    cyan: '#00FFFF',
    magenta: '#FF00FF',
    white: '#FFFFFF',
    black: '#000000'
  };

  return colorMap[color.toLowerCase()];
}

function createAsciiTree(color) {
  const treeTop = color === 'white' ? 'O' : '*';
  return {
    color: color,
    tree: `
  ${treeTop}  
 /|\\ 
  |  
`
  };
}

app.post('/arrivals', (req, res) => {
  const color = req.body.color;
  const time = req.body.time;

  if (!color || !time) {
    res.status(400).json({ error: 'Invalid input. Please provide a color and a time.' });
  } else {
    const hexColor = colorNameToHex(color);
    if (hexColor) {
      const newTree = createAsciiTree(color);
      forest.push(newTree);
      console.log(`Received color: ${hexColor} at ${time}. Added a new ${color} tree to the forest.`);
      res.status(200).json({ message: `Color received at ${time}.`, color: hexColor, tree: newTree.tree });
    } else {
      res.status(400).json({ error: `Invalid color name: ${color}. Please provide a basic color name.` });
    }
  }
});

app.get('/forest', (req, res) => {
  let htmlForest = forest.map(tree => `<pre style="color:${tree.color};">${tree.tree}</pre>`).join('');

  let htmlPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Forest</title>
  <style>
    body {
      font-family: monospace;
      white-space: pre;
    }
  </style>
</head>
<body>
  ${htmlForest}
</body>
</html>
  `;

  res.send(htmlPage);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
