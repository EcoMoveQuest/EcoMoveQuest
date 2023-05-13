const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let forest = [];

// Create WebSocket server on the same port
const wss = new WebSocket.Server({ noServer: true });

app.post('/arrivals', (req, res) => {
  const color = req.body.color;

  if (!color) {
    res.status(400).json({ error: 'Invalid input. Please provide a color.' });
  } else {
      const currentTime = new Date().toISOString();
      const newTree = {color: color, time: currentTime};
      forest.push(newTree);
      console.log(`Received color: ${color} at ${currentTime}. Added a new ${color} tree to the forest.`);
      
      // Broadcast the new tree to all connected WebSocket clients
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(newTree));
        }
      });

      res.status(200).json({ message: `Color received at ${currentTime}.`, color: color, tree: newTree });
  }
});

app.get('/forest', (req, res) => {
  res.json(forest);
});

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Handle upgrades of the request to the WebSocket protocol
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
