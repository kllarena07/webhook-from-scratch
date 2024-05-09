import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import randomstring from 'randomstring';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const staticDir = path.join(__dirname, 'src');

app.use(cors());

app.use(express.json())

app.post("/webhook/call_back", (req, res) => {
  const jsonData = req.body;
  console.log('Received JSON data:', jsonData);
  res.status(200).send('Data received successfully');
});

let clients = []

app.get("/webhook/call_back", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");

  for (let i = 0; i < 5; ++i) {
    setTimeout(() => {
      res.write(`data: hello! i = ${i}\n\n`);
    }, (i + 1) * 1000);
  }
});

app.get("/register", (req, res) => {
  const id = randomstring.generate();

  const json_data = {
    message: "Successfully created an id.",
    id
  };

  clients.push({ id, res });

  console.log(clients.length);

  req.on('close', () => {
    console.log(`${id} Connection closed`);
    clients = clients.filter(client => client.id !== id);
  });

  res.json(json_data);
});

app.use(express.static(staticDir));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
