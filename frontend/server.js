import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
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

app.get("/register", (req, res) => {
  const json_data = {
    message: "Welcome to the registration endpoint!"
  };
  res.json(json_data);
});

app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");

  for (let i = 0; i < 5; ++i) {
    setTimeout(() => {
      res.write(`data: hello! i = ${i}\n\n`);
    }, (i + 1) * 1000);
  }
});

app.use(express.static(staticDir));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
