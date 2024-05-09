import express, { json } from 'express';
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

let clients = [];

app.post("/webhook/callback", (req, res) => {
  const json_data = req.body;
  console.log('Received JSON data:', json_data);
  res.status(200).send('Data received successfully');
});

app.get("/webhook/callback", (req, res) => {
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

  clients.push({ 
    id,
    client_res: res
  });

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
